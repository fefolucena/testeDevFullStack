<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@teste.com'],
            [
                'name' => 'Usuário Admin',
                'password' => Hash::make('123456'),
                'role_level' => 1,
            ]
        );

        User::updateOrCreate(
            ['email' => 'moderador@teste.com'],
            [
                'name' => 'Usuário Moderador',
                'password' => Hash::make('123456'),
                'role_level' => 2,
            ]
        );

        User::updateOrCreate(
            ['email' => 'leitor@teste.com'],
            [
                'name' => 'Usuário Leitor',
                'password' => Hash::make('123456'),
                'role_level' => 3,
            ]
        );
    }
}
