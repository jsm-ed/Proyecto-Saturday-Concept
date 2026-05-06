<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_brand', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->string('brand_name');

            $table->primary(['product_id', 'brand_name']);
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('brand_name')->references('name')->on('brands')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_brand');
    }
};
