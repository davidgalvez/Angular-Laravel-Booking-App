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
            'title' => 'required|string',
            'description' => 'required|string',
            'air_conditioning' => 'boolean',
            'heating' => 'boolean',
            'elevator' => 'boolean',
            'available' => 'boolean'
        ]);

        $apartment = new Apartment($request->all());
        $apartment->landlord_id = auth()->id();
        $apartment->save();
        
        return response()->json($apartment, 201);
    }
}
