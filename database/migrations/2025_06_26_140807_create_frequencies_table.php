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
        Schema::create('catalogs.frequencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $now = now()->toDateTimeString();
        $frequencies = [
            ['name' => 'Mensual', 'created_at' => $now],
            ['name' => 'Quincenal', 'created_at' => $now],
            ['name' => 'Semanal', 'created_at' => $now],
            ['name' => 'Diario', 'created_at' => $now],
        ];
        DB::table('catalogs.frequencies')->insert($frequencies);
    }

    public function down(): void
    {
        Schema::dropIfExists('catalogs.frequencies');
    }
};
