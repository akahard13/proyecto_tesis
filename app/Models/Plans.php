<?php

namespace App\Models;

use App\Models\Catalogs\Frequencies;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Plans extends Model
{
    protected $table = 'catalogs.plans';
    protected $fillable = [
        'name',
        'active',
        'deleted',
    ];
}
