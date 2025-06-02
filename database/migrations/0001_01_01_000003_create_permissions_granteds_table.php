<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system.permissions_granted', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permission_id')->constrained('system.permissions');
            $table->foreignId('page_id')->constrained('system.pages');
            $table->foreignId('user_id')->constrained('system.users');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();

            $table->unique(['permission_id', 'page_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system.permissions_granted');
    }
};