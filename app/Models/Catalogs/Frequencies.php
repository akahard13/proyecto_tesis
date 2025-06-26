<?php

namespace App\Models\Catalogs;

use App\Models\Plans;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Frequencies extends Model
{
    protected $table = 'catalogs.frequencies';

    protected $fillable = [
        'name', 'active', 'deleted',
    ];

    public function prices(): HasMany
    {
        return $this->hasMany(Plans::class, 'frequency_id');
    }
}
