<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        return OrderItem::with(['order', 'product'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $orderItem = OrderItem::create($request->all());
        return response()->json($orderItem, 201);
    }

    public function show(string $orderId, string $productId)
    {
        return OrderItem::where('order_id', $orderId)
            ->where('product_id', $productId)
            ->firstOrFail()
            ->load(['order', 'product']);
    }

    public function update(Request $request, string $orderId, string $productId)
    {
        $orderItem = OrderItem::where('order_id', $orderId)
            ->where('product_id', $productId)
            ->firstOrFail();
        $orderItem->update($request->all());
        return response()->json($orderItem);
    }

    public function destroy(string $orderId, string $productId)
    {
        $orderItem = OrderItem::where('order_id', $orderId)
            ->where('product_id', $productId)
            ->firstOrFail();
        $orderItem->delete();
        return response()->json(null, 204);
    }
}
