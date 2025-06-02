<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    use HasFactory;

    protected $table = 'system.pages';

    protected $fillable = [
        'name',
        'url',
        'icon',
        'index',
        'active',
        'deleted'
    ];

    protected $casts = [
        'active' => 'boolean',
        'deleted' => 'boolean',
        'index' => 'integer'
    ];

    protected $attributes = [
        'active' => true,
        'deleted' => false,
        'index' => 0
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'system.permissions_granted', 'page_id', 'permission_id')
            ->withPivot(['active', 'deleted'])
            ->wherePivot('deleted', false);
    }
}
