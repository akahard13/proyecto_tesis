<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    use HasFactory;

    protected $table = 'system.permissions';

    protected $fillable = [
        'name',
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

    public function pages()
    {
        return $this->belongsToMany(Pages::class, 'system.permissions_granted', 'permission_id', 'page_id')
                   ->withPivot(['active', 'deleted'])
                   ->wherePivot('deleted', false);
    }
}