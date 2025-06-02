<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->date('birthday')->nullable();
            $table->foreignId('job_position_id')->constrained('catalogs.job_positions');
            $table->foreignId('gender_id')->constrained('catalogs.gender');
            $table->date('hiring_day')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->string('cellphone')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};