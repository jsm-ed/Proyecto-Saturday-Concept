<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'name';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class, 'section_name', 'name');
    }
}
