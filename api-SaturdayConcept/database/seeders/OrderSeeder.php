<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $products = Product::all();

        for ($i = 0; $i < 10; $i++) {
            $customer = $customers->random();

            $order = Order::create([
                'discount' => fake()->randomElement([0, 5, 10, 15, 20]),
                'address_id' => $customer->address_id,
                'customer_id' => $customer->id,
            ]);

            // Each order gets 1-4 random products
            $numItems = fake()->numberBetween(1, 4);
            $selectedProducts = $products->random(min($numItems, $products->count()));

            $total = 0;
            foreach ($selectedProducts as $product) {
                $quantity = fake()->numberBetween(1, 3);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ]);
                
                $total += $product->price * $quantity;
            }
            
            // Apply discount (assuming discount is a percentage string like "10")
            $discountedTotal = $total - ($total * ($order->discount / 100));
            $order->update(['order_total' => $discountedTotal]);
        }
    }
}
