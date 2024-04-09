<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('criterias')->insert(
            [
                [
                    'criteria' => 'Penguasaan Pemasaran',
                    'code' => 'A1',
                    'factor' => 'CF',
                    'value' => 3,
                    'aspect_id' => 1,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Penguasaan Area',
                    'code' => 'A2',
                    'factor' => 'CF',
                    'value' => 4,
                    'aspect_id' => 1,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Kreatif',
                    'code' => 'A3',
                    'factor' => 'CF',
                    'value' => 3,
                    'aspect_id' => 1,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Komitmen',
                    'code' => 'A4',
                    'factor' => 'SF',
                    'value' => 4,
                    'aspect_id' => 1,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Inovatif',
                    'code' => 'A5',
                    'factor' => 'SF',
                    'value' => 3,
                    'aspect_id' => 1,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Jujur',
                    'code' => 'A6',
                    'factor' => 'CF',
                    'value' => 3,
                    'aspect_id' => 2,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Bertanggung Jawab',
                    'code' => 'A7',
                    'factor' => 'CF',
                    'value' => 2,
                    'aspect_id' => 2,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Disiplin',
                    'code' => 'A8',
                    'factor' => 'CF',
                    'value' => 4,
                    'aspect_id' => 2,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Bekerjasama Tim',
                    'code' => 'A9',
                    'factor' => 'SF',
                    'value' => 3,
                    'aspect_id' => 2,
                    'created_at' => now()
                ],
                [
                    'criteria' => 'Percaya Diri',
                    'code' => 'A10',
                    'factor' => 'SF',
                    'value' => 3,
                    'aspect_id' => 2,
                    'created_at' => now()
                ],
                
            ]
        );
    }
}
