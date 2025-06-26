<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentPlanS extends Model
{
    protected $table = 'payments_plans';

    protected $fillable = [
        'plan',
        'client',
        'user_maker',
        'start_date',
        'end_date',
        'active',
        'deleted'
    ];

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plans::class, 'plan');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Clients::class, 'client');
    }

    public function userMaker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_maker');
    }
}
