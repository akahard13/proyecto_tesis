<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionsGranted extends Model
{
    use HasFactory;

    protected $table = 'system.permissions_granted';

    protected $fillable = [
        'permission_id',
        'page_id',
        'active',
        'deleted'
    ];

    protected $casts = [
        'active' => 'boolean',
        'deleted' => 'boolean'
    ];

    protected $attributes = [
        'active' => true,
        'deleted' => false
    ];

    public function permission()
    {
        return $this->belongsTo(Permissions::class);
    }

    public function page()
    {
        return $this->belongsTo(Pages::class);
    }
}