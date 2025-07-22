<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('outcomings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('catalogs.categories')->onDelete('cascade');
            $table->string('description');
            $table->float('amount');
            $table->date('registered_at');
            $table->unsignedBigInteger('payment_employee_id')->nullable();
            $table->foreign('payment_employee_id')->references('id')->on('payment_employees')->onDelete('cascade');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outcomings');
    }
};
