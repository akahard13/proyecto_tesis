<?php

namespace App\Models;

use App\Models\Catalogs\Categories;
use Illuminate\Database\Eloquent\Model;

class Incomings extends Model
{
    protected $table = 'incomings';

    protected $fillable = [
        'category_id',
        'description',
        'amount',
        'registered_at',
        'payment_plan_id',
        'active',
        'deleted',
    ];
    protected $casts =[
        'registered_at' => 'date:Y-m-d',
        'amount' => 'float:2',
        'active' => 'boolean',
        'deleted' => 'boolean',
    ];

    public function paymentPlan()
    {
        return $this->belongsTo(PaymentPlans::class);
    }

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
}
