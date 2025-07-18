<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Gender;
use App\Models\Employees;
use App\Models\Catalogs\JobPositions;
use App\Services\EmployeesServices;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    protected $rol = 3;
    private $_service;

    public function __construct()
    {
        $this->_service = new EmployeesServices();
    }

    public function index()
    {
        $employees = $this->_service->getEmployees();
        return Inertia::render('Employees/Main', [
            'employees' => $employees
        ]);
    }
    public function create()
    {
        return Inertia::render('Employees/Create', [
            'genders' => Gender::all(),
            'job_positions' => JobPositions::all(),
    
        ]);
        
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'gender_id' => 'required|numeric',
            'cellphone' => 'required|numeric',
            'job_position_id' => 'required|numeric',
            'hiring_day' => 'required|date'
        ]);

        try {
            $employeeId = $this->insertInto('employees', [
                'name' => ucfirst($request->name),
                'lastname' => ucfirst($request->lastname),
                'birthday' => $request->birthday,
                'gender_id' => $request->gender_id,
                'cellphone' => $request->cellphone,
                'job_position_id' => $request->job_position_id,
                'hiring_day' => $request->hiring_day
            ], true);

            $this->createUser(
                $employeeId,
                'employees',
                $request->name,
                $request->lastname,
                null,
                $this->rol
            );

            return redirect()->route('employees')->with('success', 'Empleado creado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function edit($id)
    {
        $employee = Employees::find($id);
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'genders' => Gender::all(),
            'job_positions' => JobPositions::all()
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'gender_id' => 'required|numeric',
            'cellphone' => 'required|numeric',
            'job_position_id' => 'required|numeric',
            'hiring_day' => 'required|date'
        ]);

        try {
            $this->_service->update($request, $id);
            return redirect()->route('employees')->with('success', 'Empleado actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function delete($id)
    {
        try {
            $employee = Employees::find($id);
            $employee->active = false;
            $employee->deleted = true;
            $employee->save();
            return redirect()->route('employees')->with('success', 'Empleado eliminado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
