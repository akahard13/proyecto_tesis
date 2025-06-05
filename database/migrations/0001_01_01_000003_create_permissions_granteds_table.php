<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system.permissions_granted', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permission_id')->constrained('system.permissions');
            $table->foreignId('page_id')->constrained('system.pages');
            $table->foreignId('rol_id')->constrained('system.roles');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $permissions = [
            [
                'permission_id' => 1,
                'page_id' => 1,
                'rol_id' => 1
            ],
            [
                'permission_id' => 1,
                'page_id' => 2,
                'rol_id' => 1
            ],
            [
                'permission_id' => 2,
                'page_id' => 2,
                'rol_id' => 1
            ]
        ];
        DB::table('system.permissions_granted')->insert($permissions);
    }

    public function down(): void
    {
        Schema::dropIfExists('system.permissions_granted');
    }
};
