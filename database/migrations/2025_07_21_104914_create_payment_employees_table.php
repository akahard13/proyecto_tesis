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
        Schema::create('payment_employees', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('employee');
            $table->float('amount');
            $table->string('description');
            $table->date('payment_date');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);

            $table->foreign('employee')->references('id')->on('employees')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_employees');
    }
};
