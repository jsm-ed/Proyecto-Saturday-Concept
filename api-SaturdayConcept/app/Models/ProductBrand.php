<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductBrand extends Model
{
    public $timestamps = false;
    protected $table = 'product_brand';
    public $incrementing = false;
    protected $fillable = ['product_id', 'brand_name'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_name', 'name');
    }

    protected function setKeysForSaveQuery($query)
    {
        $query->where('product_id', $this->getAttribute('product_id'))
              ->where('brand_name', $this->getAttribute('brand_name'));
        return $query;
    }
}
