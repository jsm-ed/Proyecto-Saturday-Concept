<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return Brand::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:brands,name']);
        $brand = Brand::create($request->all());
        return response()->json($brand, 201);
    }

    public function show(string $name)
    {
        return Brand::where('name', $name)->firstOrFail();
    }

    public function update(Request $request, string $name)
    {
        $brand = Brand::where('name', $name)->firstOrFail();
        $brand->update($request->all());
        return response()->json($brand);
    }

    public function destroy(string $name)
    {
        $brand = Brand::where('name', $name)->firstOrFail();
        $brand->delete();
        return response()->json(null, 204);
    }
}
