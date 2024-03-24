<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scales')->insert(
            [
                [
                    'title' => 'Sangat Kurang',
                    'value' => 1,
                    'created_at' => now()
                ],
                [
                    'title' => 'Kurang',
                    'value' => 2,
                    'created_at' => now()
                ],
                [
                    'title' => 'Cukup',
                    'value' => 3,
                    'created_at' => now()
                ],
                [
                    'title' => 'Baik',
                    'value' => 4,
                    'created_at' => now()
                ],
                [
                    'title' => 'Sangat baik',
                    'value' => 5,
                    'created_at' => now()
                ],
            ]
        );
    }
}
