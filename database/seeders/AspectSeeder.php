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
                    'problem_id' => 1,
                    'percentage' => 75,
                    'created_at' => now()
                ],
                [
                    'name' => 'Target Kerja',
                    'problem_id' => 1,
                    'percentage' => 25,
                    'created_at' => now()
                ],
            ]
        );
    }
}
