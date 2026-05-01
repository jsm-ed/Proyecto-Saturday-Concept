<?php

namespace App\Http\Controllers;

use App\Models\ProductBrand;
use Illuminate\Http\Request;

class ProductBrandController extends Controller
{
    public function index()
    {
        return ProductBrand::with(['product', 'brand'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'brand_name' => 'required|exists:brands,name',
        ]);
        $productBrand = ProductBrand::create($request->all());
        return response()->json($productBrand, 201);
    }

    public function show(string $productId, string $brandName)
    {
        return ProductBrand::where('product_id', $productId)
            ->where('brand_name', $brandName)
            ->firstOrFail();
    }

    public function update(Request $request, string $productId, string $brandName)
    {
        $productBrand = ProductBrand::where('product_id', $productId)
            ->where('brand_name', $brandName)
            ->firstOrFail();
        $productBrand->update($request->all());
        return response()->json($productBrand);
    }

    public function destroy(string $productId, string $brandName)
    {
        $productBrand = ProductBrand::where('product_id', $productId)
            ->where('brand_name', $brandName)
            ->firstOrFail();
        $productBrand->delete();
        return response()->json(null, 204);
    }
}
