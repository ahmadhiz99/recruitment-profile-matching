<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert(
            [
                [
                    'name' => 'admin',
                    'level' => 1,
                    'created_at' => now()
                ],
                [
                    'name' => 'staff',
                    'level' => 2,
                    'created_at' => now()
                ],
                [
                    'name' => 'user',
                    'level' => 3,
                    'created_at' => now()
                ],
            ]
        );

    }
}
