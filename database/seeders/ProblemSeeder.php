<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProblemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('problems')->insert(
            [
                [
                    'title' => 'Seleksi Calon karyawan Programmer',
                    'description' => 'Ini adalah proses perhitungan seleksi otomatis menggunakan sistem pendukung keputusan dengan metode profile matching',
                    'created_by' => 'Super Admin',
                    'status' => 'open',
                    'core_factor' => 60,
                    'secondary_factor' => 40,
                    'created_at' => now()
                ],
                [
                    'title' => 'Seleksi Calon karyawan IT Supervisor',
                    'description' => 'Ini adalah proses perhitungan seleksi otomatis menggunakan sistem pendukung keputusan dengan metode profile matching',
                    'created_by' => 'Akbar Staff',
                    'status' => 'pending',
                    'core_factor' => 60,
                    'secondary_factor' => 40,
                    'created_at' => now()
                ],
            ]
        );
    }
}
