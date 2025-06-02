<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (config('database.default') === 'pgsql') {
            DB::statement('CREATE SCHEMA IF NOT EXISTS catalogs');
        }
        Schema::create('catalogs.gender', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $now = now()->toDateTimeString();
        $gender = [
            ['name' => 'Masculino', 'created_at' => $now],
            ['name' => 'Femenino', 'created_at' => $now],
        ];
        DB::table('catalogs.gender')->insert($gender);
    }

    public function down(): void
    {
        Schema::dropIfExists('catalogs.gender');
    }
};
