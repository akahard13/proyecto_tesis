<?php

namespace App\Services;

use App\Models\Catalogs\JobPositions;
use App\Models\Employees;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class EmployeesServices
{
    public function getEmployees()
    {
        return DB::table('employees as e')
            ->join('catalogs.gender as gen', 'gen.id', '=', 'e.gender_id')
            ->join('catalogs.job_positions as jp', 'jp.id', '=', 'e.job_position_id')
            ->leftJoin('system.users as u', function ($join) {
                $join->on('u.id', '=', 'e.id')
                    ->where('u.rol_id', '=', 3);
            })
            ->select('e.*', 'gen.name as gender_name', 'jp.name as job_position_name', 'u.username as user_name')
            ->where('e.deleted', false)
            ->where('e.active', true)
            ->get();
    }
    public function update($request, $id)
    {
        $employee = Employees::find($id);
        $employee->name = ucfirst($request->name);
        $employee->lastname = ucfirst($request->lastname);
        $employee->birthday = $request->birthday;
        $employee->gender_id = $request->gender_id;
        $employee->cellphone = $request->cellphone;
        $employee->job_position_id = $request->job_position_id;
        $employee->hiring_day = $request->hiring_day;
        $employee->save();

        return $employee;
    }
}
