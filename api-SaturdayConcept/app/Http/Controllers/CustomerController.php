<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::with('address.city.country')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'surnames' => 'required|string',
            'contact' => 'required|string',
            'address_id' => 'required|exists:addresses,id',
        ]);
        $customer = Customer::create($request->all());
        return response()->json($customer, 201);
    }

    public function show(Customer $customer)
    {
        return $customer->load('address.city.country');
    }

    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->all());
        return response()->json($customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(null, 204);
    }
}
