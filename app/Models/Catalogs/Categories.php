<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $table = 'catalogs.categories';
    protected $fillable = [
        'name',
        'outgoing',
        'incoming',
        'active',
        'deleted'
    ];
    protected $casts = [
        'outgoing' => 'boolean',
        'incoming' => 'boolean',
        'active' => 'boolean',
        'deleted' => 'boolean'
    ];
}
