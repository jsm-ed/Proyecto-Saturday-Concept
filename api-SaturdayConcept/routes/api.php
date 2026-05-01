<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductBrandController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;

Route::apiResource('sections', SectionController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('brands', BrandController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('countries', CountryController::class);
Route::apiResource('cities', CityController::class);
Route::apiResource('addresses', AddressController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('orders', OrderController::class);

// ProductBrand (composite key)
Route::get('product-brands', [ProductBrandController::class, 'index']);
Route::post('product-brands', [ProductBrandController::class, 'store']);
Route::get('product-brands/{product_id}/{brand_name}', [ProductBrandController::class, 'show']);
Route::put('product-brands/{product_id}/{brand_name}', [ProductBrandController::class, 'update']);
Route::delete('product-brands/{product_id}/{brand_name}', [ProductBrandController::class, 'destroy']);

// OrderItem (composite key)
Route::get('order-items', [OrderItemController::class, 'index']);
Route::post('order-items', [OrderItemController::class, 'store']);
Route::get('order-items/{order_id}/{product_id}', [OrderItemController::class, 'show']);
Route::put('order-items/{order_id}/{product_id}', [OrderItemController::class, 'update']);
Route::delete('order-items/{order_id}/{product_id}', [OrderItemController::class, 'destroy']);
