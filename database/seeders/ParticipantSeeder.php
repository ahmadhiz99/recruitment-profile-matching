<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('participants')->insert(
            [
                [
                    'user_id' => 3,
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'user_id' => 4,
                    'problem_id' => 1,
                    'created_at' => now()
                ],
                [
                    'user_id' => 5,
                    'problem_id' => 1,
                    'created_at' => now()
                ],
            ]
        );
    }
}
