<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with(['section', 'size', 'brands'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'section_name' => 'required|exists:sections,name',
        ]);
        $product = Product::create($request->all());

        if ($request->has('brands')) {
            $product->brands()->attach($request->brands);
        }

        return response()->json($product->load(['section', 'size', 'brands']), 201);
    }

    public function show(Product $product)
    {
        return $product->load(['section', 'size', 'brands']);
    }

    public function update(Request $request, Product $product)
    {
        $product->update($request->all());

        if ($request->has('brands')) {
            $product->brands()->sync($request->brands);
        }

        return response()->json($product->load(['section', 'size', 'brands']));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
