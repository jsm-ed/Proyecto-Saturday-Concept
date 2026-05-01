<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return Section::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:sections,name']);
        $section = Section::create($request->all());
        return response()->json($section, 201);
    }

    public function show(string $name)
    {
        return Section::where('name', $name)->firstOrFail();
    }

    public function update(Request $request, string $name)
    {
        $section = Section::where('name', $name)->firstOrFail();
        $section->update($request->all());
        return response()->json($section);
    }

    public function destroy(string $name)
    {
        $section = Section::where('name', $name)->firstOrFail();
        $section->delete();
        return response()->json(null, 204);
    }
}
