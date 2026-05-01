<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        return City::with('country')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'country_id' => 'required|exists:countries,id',
        ]);
        $city = City::create($request->all());
        return response()->json($city, 201);
    }

    public function show(City $city)
    {
        return $city->load('country');
    }

    public function update(Request $request, City $city)
    {
        $city->update($request->all());
        return response()->json($city);
    }

    public function destroy(City $city)
    {
        $city->delete();
        return response()->json(null, 204);
    }
}
