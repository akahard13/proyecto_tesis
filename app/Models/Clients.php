<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalogs\Gender;
use App\Models\PaymentPlans;

class Clients extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lastname',
        'birthday',
        'gender_id',
        'code',
        'inscription_day',
        'cellphone'
    ];

    protected $casts = [
        'birthday' => 'date:Y-m-d',
        'inscription_day' => 'date:Y-m-d'
    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    // Accesor para nombre completo
    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->lastname}";
    }
    public function payments_plans()
    {
        return $this->hasMany(PaymentPlans::class, 'client');
    }
}
