<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
    use HasFactory;

    protected $table = 'catalogs.gender';

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
}