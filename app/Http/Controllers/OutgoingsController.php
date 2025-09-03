<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Categories;
use App\Models\Outgoings;
use App\Services\OutgoingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class OutgoingsController extends Controller
{
    private $_service;
    public function __construct()
    {
        $this->_service = new OutgoingService();
    }

    public function index()
    {
        $outgoings = $this->_service->getOutgoings();
        $categories = $this->_service->getOutgoingsCategories();
        $today = date('Y-m-d');
        return Inertia::render('Finance/Main', [
            'data' => $outgoings,
            'categories' => $categories,
            'start_date' => $today,
            'ingreso' => false,
            'title' => 'Crear Egreso'
        ]);
    }

    public function create()
    {
        $categories = $this->_service->getOutgoingsCategories();
        $today = date('Y-m-d');
        return Inertia::render('Finance/Form', [
            'categories' => $categories,
            'edit' => false,
            'title' => 'Registrar Egreso',
            'button_text' => 'Guardar Egreso',
            'default_date' => $today
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|numeric',
            'amount' => 'required|numeric',
            'registered_at' => 'required|date',
            'description' => 'required|string|max:500'
        ]);
        try {
            $outgoing = $this->_service->store($request);
            return redirect()->route('outgoings')->with('success', 'Egreso creado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function edit(Outgoings $outgoing)
    {
        $categories = $this->_service->getOutgoingsCategories();
        return Inertia::render('Finance/Form', [
            'finance' => $outgoing,
            'categories' => $categories,
            'edit' => true,
            'title' => 'Editar Egreso',
            'button_text' => 'Actualizar Egreso'
        ]);
    }

    public function update(Request $request, Outgoings $outgoing)
    {
        $request->validate([
            'category_id' => 'required|numeric',
            'amount' => 'required|numeric',
            'registered_at' => 'required|date',
            'description' => 'required|string|max:500'
        ]);
        try {
            $this->_service->update($request, $outgoing);
            return redirect()->route('outgoings')->with('success', 'Egreso actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(Outgoings $outgoing)
    {
        try {
            $this->_service->delete($outgoing);
            return redirect()->route('outgoings')->with('success', 'Ingreso eliminado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
