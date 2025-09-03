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
        Schema::create('catalogs.categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('outgoing');
            $table->boolean('incoming');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        DB::table('catalogs.categories')->insert([
            ['name' => 'Planes', 'outgoing' => false, 'incoming' => true, 'active' => true, 'deleted' => false],
            ['name' => 'Salarios', 'outgoing' => true, 'incoming' => false, 'active' => true, 'deleted' => false],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catalogs.categories');
    }
};
