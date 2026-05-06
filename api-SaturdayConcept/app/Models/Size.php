<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'name';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class, 'size_name', 'name');
    }
}
