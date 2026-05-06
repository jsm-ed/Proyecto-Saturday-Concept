<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public $timestamps = false;
    protected $table = 'order_items';
    public $incrementing = false;
    protected $fillable = ['order_id', 'product_id', 'quantity'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected function setKeysForSaveQuery($query)
    {
        $query->where('order_id', $this->getAttribute('order_id'))
              ->where('product_id', $this->getAttribute('product_id'));
        return $query;
    }
}
