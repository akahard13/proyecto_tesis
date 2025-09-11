<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->string('image', 500)->nullable();
            $table->date('birthday')->nullable();
            $table->foreignId('gender_id')->constrained('catalogs.gender');
            $table->string('code')->unique();
            $table->date('inscription_day')->nullable();
            $table->string('cellphone')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
