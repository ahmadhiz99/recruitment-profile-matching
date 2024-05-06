<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParticipantCriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('participant_criterias')->insert(
            [
                [
                    'participant_id' => 1,
                    'criteria_id' => 1,
                    'value' => 5,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 2,
                    'value' => 4,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 3,
                    'value' => 4,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 4,
                    'value' => 3,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 5,
                    'value' => 5,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 6,
                    'value' => 3,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 7,
                    'value' => 2,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 8,
                    'value' => 4,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 9,
                    'value' => 5,
                    'note' => null,
                    'created_at' => now()
                ],
                [
                    'participant_id' => 1,
                    'criteria_id' => 10,
                    'value' => 4,
                    'note' => null,
                    'created_at' => now()
                ],
            ]
        );
    }
}
