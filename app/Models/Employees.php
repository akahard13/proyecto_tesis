<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catalogs\Gender;
use App\Models\Catalogs\JobPositions;

class Employees extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'lastname',
        'birthday',
        'job_position_id',
        'gender_id',
        'hiring_day',
        'salary',
        'cellphone'
    ];

    protected $casts = [
        'birthday' => 'date',
        'hiring_day' => 'date',
        'salary' => 'decimal:2'
    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function jobPosition()
    {
        return $this->belongsTo(JobPositions::class);
    }

    // Accesor para nombre completo
    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->lastname}";
    }

    // Accesor para salario formateado
    public function getFormattedSalaryAttribute()
    {
        return number_format($this->salary, 2);
    }
}