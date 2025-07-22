<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Frequencies;
use App\Models\Plans;
use App\Services\PlanServices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class PlansController extends Controller
{
    protected $_service;
    public function __construct()
    {
        $this->_service = new PlanServices();
    }
    public function index()
    {
        $plans = $this->_service->getPlans();
        return Inertia::render('Plans/Main', [
            'plans' => $plans
        ]);
    }
    public function create()
    {
        return Inertia::render('Plans/Form', [
            'frequencies' => Frequencies::where('active', true)
                ->selectRaw('id, LOWER(name) as name')
                ->get()
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mensual' => 'numeric',
            'diario' => 'numeric',
            'quincenal' => 'numeric',
            'semanal' => 'numeric'
        ]);
        try {
            $this->_service->store($request);
            return redirect()->route('plans')->with('success', 'Plan creado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function edit(Plans $plan)
    {
        $plans = $this->_service->getPlanToEdit($plan);
        return Inertia::render('Plans/Form', [
            'plan' => is_array($plans) ? $plans[0] : $plans,
            'frequencies' => Frequencies::where('active', true)
                ->selectRaw('id, LOWER(name) as name')
                ->get()
        ]);
    }
    public function update(Request $request, Plans $plan)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mensual' => 'numeric',
            'diario' => 'numeric',
            'quincenal' => 'numeric',
            'semanal' => 'numeric'
        ]);
        try {
            $this->_service->update($request, $plan);
            return redirect()->route('plans')->with('success', 'Plan actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function delete(Plans $plan)
    {
        try {
            $this->_service->delete($plan);
            return redirect()->route('plans')->with('success', 'Plan eliminado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
