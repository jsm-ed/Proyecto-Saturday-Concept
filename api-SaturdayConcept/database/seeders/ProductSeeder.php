<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Section;
use App\Models\Size;
use App\Models\Brand;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = base_path('../data/products.JSON');
        $products = json_decode(file_get_contents($jsonPath), true);

        foreach ($products as $item) {
            // Create section if not exists
            if (!empty($item['section'])) {
                Section::firstOrCreate(['name' => $item['section']]);
            }

            // Create size if not exists
            if (!empty($item['size'])) {
                Size::firstOrCreate(['name' => $item['size']]);
            }

            // Create brands if not exists
            if (!empty($item['brand'])) {
                foreach ($item['brand'] as $brandName) {
                    Brand::firstOrCreate(['name' => $brandName]);
                }
            }

            // Create product
            $product = Product::create([
                'id' => $item['id'],
                'name' => $item['name'],
                'price' => $item['price'],
                'img' => $item['img'] ?? null,
                'description' => $item['description'] ?? null,
                'section_name' => $item['section'],
                'size_name' => $item['size'] ?? null,
                'stock' => $item['stock'] ?? 0,
            ]);

            // Attach brands
            if (!empty($item['brand'])) {
                foreach ($item['brand'] as $brandName) {
                    $product->brands()->attach($brandName);
                }
            }
        }
    }
}
