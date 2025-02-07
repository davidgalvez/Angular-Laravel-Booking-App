<?php

namespace Database\Seeders;

use App\Models\Landlord;
use App\Models\Apartment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get all existing Lanlords
        $landlords = Landlord::all();

        // Validates if Lanlord exists
        if ($landlords->isEmpty()) {
            $this->command->warn("No hay landlords en la base de datos. Se deben agregar primero.");
            return;
        }

        foreach (range(1, 10) as $index) {
            Apartment::create([
                'landlord_id' => $landlords->random()->id, // Select a random Landlord
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph(),
                'air_conditioning' => $faker->boolean(),
                'heating' => $faker->boolean(),
                'elevator' => $faker->boolean(),
                'available' => true, // By default all apartments are available.
            ]);
        }
    }
}