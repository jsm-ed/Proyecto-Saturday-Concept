<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::with('brands')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'section' => 'required|exists:sections,name',
        ]);

        $data = $request->all();
        if (isset($data['section'])) {
            $data['section_name'] = $data['section'];
            unset($data['section']);
        }
        if (array_key_exists('size', $data)) {
            $data['size_name'] = $data['size'];
            unset($data['size']);
        }

        $product = Product::create($data);

        if ($request->has('brands')) {
            $product->brands()->attach($request->brands);
        }

        return new ProductResource($product->load('brands'));
    }

    public function show(Product $product)
    {
        return new ProductResource($product->load('brands'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->all();
        if (isset($data['section'])) {
            $data['section_name'] = $data['section'];
            unset($data['section']);
        }
        if (array_key_exists('size', $data)) {
            $data['size_name'] = $data['size'];
            unset($data['size']);
        }

        $product->update($data);

        if ($request->has('brands')) {
            $product->brands()->sync($request->brands);
        }

        return new ProductResource($product->load('brands'));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
