<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReservationController extends Controller
{
    public function store(Request $request) {

        // Validates the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'apartment_id' => 'required|exists:apartments,id',
            'guest_name' => 'required',
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

        // Register the reservation and updates the availability of the appartment.
        $reservation = Reservation::create($request->all());
        $apartment->update(['available' => false]);

        return response()->json($reservation, 201);
    }
}
