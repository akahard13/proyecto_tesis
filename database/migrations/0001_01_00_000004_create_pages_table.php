<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system.pages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('url');
            $table->string('icon')->nullable();
            $table->integer('index')->default(0);
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $now = now()->toDateTimeString();
        $paginas = [
            [
                'name' => 'Dashboard',
                'slug' => 'dashboard',
                'url' => '/dashboard',
                'icon' => null,
                'index' => 0,
                'active' => true,
                'deleted' => false,
                'created_at' => $now,
        ]];
        DB::table('system.pages')->insert($paginas);
    }

    public function down(): void
    {
        Schema::dropIfExists('system.pages');
    }
};
