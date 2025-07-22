<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentPlans extends Model
{
    protected $table = 'payments_plans';

    protected $fillable = [
        'plan',
        'price',
        'client',
        'user_maker',
        'start_date',
        'end_date',
        'active',
        'deleted'
    ];
    protected $casts = [
        'active' => 'boolean',
        'deleted' => 'boolean',
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d'
    ];

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plans::class, 'plan');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Clients::class, 'client');
    }

    public function price(): BelongsTo
    {
        return $this->belongsTo(Prices::class, 'price');
    }

    public function userMaker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_maker');
    }
}
