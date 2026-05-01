<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        return Address::with('city.country')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'pc' => 'required|string',
            'city_id' => 'required|exists:cities,id',
        ]);
        $address = Address::create($request->all());
        return response()->json($address, 201);
    }

    public function show(Address $address)
    {
        return $address->load('city.country');
    }

    public function update(Request $request, Address $address)
    {
        $address->update($request->all());
        return response()->json($address);
    }

    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json(null, 204);
    }
}
