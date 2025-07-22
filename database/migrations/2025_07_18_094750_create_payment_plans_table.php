<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments_plans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('plan');
            $table->unsignedBigInteger('frequency_id');
            $table->unsignedBigInteger('client');
            $table->unsignedBigInteger('user_maker')->nullable();

            $table->date('start_date')->default(DB::raw('CURRENT_DATE'));
            $table->date('end_date');
            $table->float('amount');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('plan')->references('id')->on('catalogs.plans')->onDelete('cascade');
            $table->foreign('frequency_id')->references('id')->on('catalogs.frequencies')->onDelete('cascade');
            $table->foreign('client')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('user_maker')->references('id')->on('system.users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments_plans');
    }
};
