<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DifferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('differences')->insert(
            [
                [
                    'difference' => 0,
                    'value' => 5,
                    'description' => 'Tidak Ada Selisih (kompetensi sesuai dengna yang dibutuhkan)',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => 1,
                    'value' => 4.5,
                    'description' => 'Kompetensi individu kelebihan 1 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => -1,
                    'value' => 4,
                    'description' => 'Kompetensi individu kekurangan 1 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => 2,
                    'value' => 3.5,
                    'description' => 'Kompetensi individu kelebihan 2 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => -2,
                    'value' => 3,
                    'description' => 'Kompetensi individu kekurangan 2 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => 3,
                    'value' => 2.5,
                    'description' => 'Kompetensi individu kelebihan 3 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => -3,
                    'value' => 2,
                    'description' => 'Kompetensi individu kekurangan 3 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => 4,
                    'value' => 1.5,
                    'description' => 'Kompetensi individu kelebihan 4 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'difference' => -4,
                    'value' => 1,
                    'description' => 'Kompetensi individu kekurangan 4 tingkat/level',
                    'problem_id' => 1,
                    'created_at' => now()
                ],
            ]
        );

    }
}
