<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (config('database.default') === 'pgsql') {
            DB::statement('CREATE SCHEMA IF NOT EXISTS system');
        }
        Schema::create('system.roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $now = now()->toDateTimeString();

        $roles = [
            [
                'name' => 'Administrador',
                'active' => true,
                'deleted' => false,
                'created_at' => $now,
            ],
            [
                'name' => 'Cliente',
                'active' => true,
                'deleted' => false,
                'created_at' => $now,
            ],
            [
                'name' => 'Invitado',
                'active' => true,
                'deleted' => false,
                'created_at' => $now,
            ]
        ];

        DB::table('system.roles')->insert($roles);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system.roles');
        if (config('database.default') === 'pgsql') {
            DB::statement('DROP SCHEMA IF EXISTS system CASCADE');
        }
    }
};
