<?php

namespace App\Models;

use App\Models\Catalogs\Frequencies;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prices extends Model
{
    protected $fillable = [
        'frequency_id',
        'plan_id',
        'price',
        'active',
        'deleted',
    ];

    public function frequency(): BelongsTo
    {
        return $this->belongsTo(Frequencies::class, 'frequency_id');
    }
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plans::class, 'plan_id');
    }
}
