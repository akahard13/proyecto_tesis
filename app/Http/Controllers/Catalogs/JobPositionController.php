<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\JobPositions;
use App\Services\JobPositionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPositionController extends Controller
{
    private $_service;
    public function __construct()
    {
        $this->_service = new JobPositionService();
    }
    public function index()
    {
        $jobPositions = JobPositions::where(['active' => true, 'deleted' => false])->orderBy('id', 'asc')->get();
        return Inertia::render('JobPosition/Main', [
            'jobPositions' => $jobPositions
        ]);
    }
    public function create()
    {
        return Inertia::render('JobPosition/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        if ($this->_service->store($request)) {
            return redirect()->route('job_positions')->with('success', 'Cargo creado');
        } else {
            return redirect()->route('job_positions')->with('error', 'Cargo no creado');
        }
    }
    public function edit($id)
    {
        $JobPosition = JobPositions::find($id);
        return Inertia::render('JobPosition/Edit', [
            'jobPosition' => $JobPosition
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        if ($this->_service->update($request, $id)) {
            return redirect()->route('job_positions')->with('success', 'Cargo actualizado');
        } else {
            return redirect()->route('job_positions')->with('error', 'Cargo no actualizado');
        }
    }
}
