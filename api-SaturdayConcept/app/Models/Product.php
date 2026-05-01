<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'img', 'description', 'section_name', 'size_name', 'stock'];

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_name', 'name');
    }

    public function size()
    {
        return $this->belongsTo(Size::class, 'size_name', 'name');
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'product_brand', 'product_id', 'brand_name');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
