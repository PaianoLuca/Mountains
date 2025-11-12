<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mountain;

class MountainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mountain::create([
            'name' => 'Everest',
            'height' => 8848,
            'location' => 'Nepal',
            'description' => 'Everest is the highest mountain in the world, located in the Himalayas.',
            'image' => 'everest.jpg'
        ]);

        Mountain::create([
            'name' => 'K2',
            'height' => 8611,
            'location' => 'Pakistan',
            'description' => 'K2 is the second highest mountain in the world, located in the Karakoram Mountains.',
            'image' => 'k2.jpg'
        ]);

        Mountain::create([
            'name' => 'Kangchenjunga',
            'height' => 8586,
            'location' => 'India/Nepal',
            'description' => 'Kangchenjunga is the third highest mountain in the world, located in the Himalayas.',
            'image' => 'kangchenjunga.jpg'
        ]);
    }
}
