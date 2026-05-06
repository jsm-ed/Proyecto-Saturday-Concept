<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => (float) $this->price,
            'section' => $this->section_name,
            'brand' => $this->brands->pluck('name')->toArray(),
            'img' => $this->img,
            'stock' => (int) $this->stock,
            'size' => $this->size_name,
            'description' => $this->description,
        ];
    }
}
