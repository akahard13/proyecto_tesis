<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $table = 'catalogs.categories';
    protected $fillable = [
        'name',
        'outcoming',
        'incoming',
        'active',
        'deleted'
    ];
    protected $casts = [
        'outcoming' => 'boolean',
        'incoming' => 'boolean',
        'active' => 'boolean',
        'deleted' => 'boolean'
    ];
}
