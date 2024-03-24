<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AspectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('aspects')->insert(
            [
                [
                    'name' => 'Kecerdasan',
                    'factory_id' => 1,
                    'created_at' => now()
                ],
                [
                    'name' => 'Target Kerja',
                    'factory_id' => 2,
                    'created_at' => now()
                ],
            ]
        );
    }
}
