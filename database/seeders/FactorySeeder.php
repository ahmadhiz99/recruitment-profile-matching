<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('factories')->insert(
            [
                [
                    'type' => 'core',
                    'percent' => 60,
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'type' => 'secondary',
                    'percent' => 40,
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'type' => 'core',
                    'percent' => 60,
                    'problem_id' => 2,
                    'created_at' => now()
                ],
                [
                    'type' => 'secondary',
                    'percent' => 40,
                    'problem_id' => 2,
                    'created_at' => now()
                ],
            ]
        );
    }
}
