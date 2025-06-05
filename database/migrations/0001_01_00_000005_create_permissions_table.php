<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system.permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });
        $permissions = [
            [
                'name' => 'view',
                'active' => true,
                'deleted' => false
            ],
            [
                'name' => 'store',
                'active' => true,
                'deleted' => false
            ],
            [
                'name' => 'update',
                'active' => true,
                'deleted' => false
            ],
            [
                'name' => 'delete',
                'active' => true,
                'deleted' => false
            ]
        ];
        DB::table('system.permissions')->insert($permissions);
    }

    public function down(): void
    {
        Schema::dropIfExists('system.permissions');
    }
};
