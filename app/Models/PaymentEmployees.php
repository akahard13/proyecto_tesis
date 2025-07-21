<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentEmployees extends Model
{
    protected $table = 'payment_employees';
    protected $fillable = [
        'payment_date',
        'employee_id',
        'amount',
        'description',
    ];
}
