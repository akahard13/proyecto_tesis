<?php

namespace App\Models;

use App\Models\Catalogs\Categories;
use Illuminate\Database\Eloquent\Model;

class Outcomings extends Model
{
    protected $table = 'outcomings';

    protected $fillable = [
        'category_id',
        'description',
        'amount',
        'registered_at',
        'payment_employee_id',
        'active',
        'deleted',
    ];
    protected $casts = [
        'active' => 'boolean',
        'deleted' => 'boolean',
        'registered_at' => 'date:Y-m-d',
        'amount' => 'float:2',
    ];

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }

    public function paymentEmployee()
    {
        return $this->belongsTo(Employees::class, 'payment_employee_id');
    }
}
