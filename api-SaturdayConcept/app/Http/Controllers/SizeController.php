<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        return Size::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:sizes,name']);
        $size = Size::create($request->all());
        return response()->json($size, 201);
    }

    public function show(string $name)
    {
        return Size::where('name', $name)->firstOrFail();
    }

    public function update(Request $request, string $name)
    {
        $size = Size::where('name', $name)->firstOrFail();
        $size->update($request->all());
        return response()->json($size);
    }

    public function destroy(string $name)
    {
        $size = Size::where('name', $name)->firstOrFail();
        $size->delete();
        return response()->json(null, 204);
    }
}
