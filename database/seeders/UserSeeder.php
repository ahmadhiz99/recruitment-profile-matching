<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert(
            [
                [
                    'name' => 'Super Admin',
                    'email' => 'admin@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 1,
                    'created_at' => now(),
                ],
                [
                    'name' => 'Akbar Staff',
                    'email' => 'staff@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 2,
                    'created_at' => now(),
                ],
                [
                    'name' => 'Joko',
                    'email' => 'joko@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 3,
                    'created_at' => now(),
                ],
                [
                    'name' => 'Siti',
                    'email' => 'siti@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 3,
                    'created_at' => now(),
                ],
                [
                    'name' => 'Putri',
                    'email' => 'putri@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 3,
                    'created_at' => now(),
                ],
            ]
        );
    }
}
