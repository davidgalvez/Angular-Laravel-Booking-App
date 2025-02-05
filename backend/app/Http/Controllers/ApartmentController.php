<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;

class ApartmentController extends Controller
{
        
    /**
     * index: 
     * Gets the list of available apartments
     * and filter by features depending on the request params
     *
     * @param  mixed $request Http request parameters for the list.
     * @return void returns the response in json format.
     */
    public function index(Request $request) {
        $query = Apartment::where('available', true);

        if ($request->has('air_conditioning')) {
            $query->where('air_conditioning', true);
        }
        if ($request->has('heating')) {
            $query->where('heating', true);
        }
        if ($request->has('elevator')) {
            $query->where('elevator', true);
        }

        return response()->json($query->get());
    }

        
    /**
     * store:
     * Creates and apartment
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request) {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'landlord_id' => 'required|exists:landlords,id',
        ]);

        $apartment = Apartment::create($request->all());
        return response()->json($apartment, 201);
    }
}
