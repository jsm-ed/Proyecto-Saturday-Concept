<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;
use App\Models\City;
use App\Models\Address;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            'España' => ['Madrid', 'Barcelona', 'Palma de Mallorca', 'Valencia', 'Sevilla'],
            'Francia' => ['París', 'Marsella', 'Lyon'],
            'Italia' => ['Roma', 'Milán'],
        ];

        $createdCities = [];

        foreach ($countries as $countryName => $cities) {
            $country = Country::firstOrCreate(['name' => $countryName]);
            foreach ($cities as $cityName) {
                $city = City::firstOrCreate([
                    'name' => $cityName,
                    'country_id' => $country->id,
                ]);
                $createdCities[] = $city;
            }
        }

        $names = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'Miguel', 'Sofía', 'Pablo', 'Elena'];
        $surnames = ['García López', 'Martínez Ruiz', 'Fernández Sánchez', 'González Díaz', 'Rodríguez Pérez',
                     'López Moreno', 'Hernández Gil', 'Muñoz Navarro', 'Romero Ortiz', 'Jiménez Torres'];

        for ($i = 0; $i < 10; $i++) {
            $city = $createdCities[array_rand($createdCities)];

            $address = Address::create([
                'name' => 'Calle ' . fake()->streetName(),
                'door' => fake()->numberBetween(1, 10) . fake()->randomElement(['A', 'B', 'C', 'D']),
                'pc' => fake()->postcode(),
                'city_id' => $city->id,
            ]);

            Customer::create([
                'name' => $names[$i],
                'surnames' => $surnames[$i],
                'contact' => fake()->phoneNumber(),
                'address_id' => $address->id,
            ]);
        }
    }
}
