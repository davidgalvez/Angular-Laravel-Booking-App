<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationRequested;

class ReservationController extends Controller
{
    public function store(Request $request) {

        // Validates the request
        $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'guest_name' => 'required|string',
            'guest_birth_date' => 'required|date',
        ]);

        // Parse the birthdate and validates if the user is older than 18.
        $birthDate = Carbon::parse($request->guest_birth_date);
        if ($birthDate->diffInYears(now()) < 18) {
            return response()->json(['error' => 'Guest must be at least 18 years old.'], 422);
        }

        // Validates if the apartment is available to make a reservation.
        $apartment = Apartment::findOrFail($request->apartment_id);
        if (!$apartment->available) {
            return response()->json(['error' => 'Apartment is not available.'], 422);
        }

        // Register the reservation with status "pending".
        $reservation = Reservation::create([
            'apartment_id' => $request->apartment_id,
            'guest_name' => $request->guest_name,
            'guest_birth_date' => $request->guest_birth_date,
            'status' => 'pending',
        ]);
        
        //Send the notification by email to the Landlord
        Mail::to($apartment->landlord->email)->send(new ReservationRequested($reservation));

        return response()->json($reservation, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $reservation = Reservation::findOrFail($id);

        if ($request->status == 'approved') {
            $reservation->apartment->update(['available' => false]);
        }

        $reservation->update(['status' => $request->status]);

        // Send the reservation status update notification to the user by email.
        Mail::to($reservation->guest_email)->send(new ReservationStatusUpdated($reservation));

        return response()->json($reservation);
    }
}
