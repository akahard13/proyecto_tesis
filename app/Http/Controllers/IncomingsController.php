<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Categories;
use App\Models\Incomings;
use App\Services\IncomingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class IncomingsController extends Controller
{
    private $_service;
    public function __construct()
    {
        $this->_service = new IncomingService();
    }

    public function index()
    {
        $incomings = $this->_service->getIncomings();
        $categories = $this->_service->getIncomingsCategories();
        $today = date('Y-m-d');
        return Inertia::render('Finance/Main', [
            'data' => $incomings,
            'categories' => $categories,
            'start_date' => $today,
            'ingreso' => true,
        ]);
    }

    public function create()
    {
        $categories = $this->_service->getIncomingsCategories();
        $today = date('Y-m-d');
        return Inertia::render('Finance/Form', [
            'categories' => $categories,
            'edit' => false,
            'title' => 'Registrar Ingresos',
            'button_text' => 'Guardar Ingreso',
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
            $incoming = $this->_service->store($request);
            return redirect()->route('incomings')->with('success', 'Ingreso creado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function edit(Incomings $incoming)
    {
        $categories = $this->_service->getIncomingsCategories();
        return Inertia::render('Finance/Form', [
            'finance' => $incoming,
            'categories' => $categories,
            'edit' => true,
            'title' => 'Editar Ingreso',
            'button_text' => 'Actualizar Ingreso'
        ]);
    }

    public function update(Request $request, Incomings $incoming)
    {
        $request->validate([
            'category_id' => 'required|numeric',
            'amount' => 'required|numeric',
            'registered_at' => 'required|date',
            'description' => 'required|string|max:500'
        ]);
        try {
            $this->_service->update($request, $incoming);
            return redirect()->route('incomings')->with('success', 'Ingreso actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(Incomings $incoming)
    {
        try {
            $this->_service->delete($incoming);
            return redirect()->route('incomings')->with('success', 'Ingreso eliminado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
