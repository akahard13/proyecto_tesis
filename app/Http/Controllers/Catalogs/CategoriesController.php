<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Catalogs\Categories;
use App\Services\CategoriesService;
use App\Services\CategoriesServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    private $_service;

    public function __construct()
    {
        $this->_service = new CategoriesServices();
    }

    public function index()
    {
        $categories = $this->_service->getAllActiveCategories();
        return Inertia::render('Categories/Main', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'incoming' => 'boolean',
            'outcoming' => 'boolean',
        ]);

        $this->_service->store($request);
        return redirect()->route('categories')->with('success', 'Categoría creada correctamente.');
    }

    public function edit($id)
    {
        $categories = Categories::find($id);
        return Inertia::render('Categories/Edit', [
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'incoming' => 'boolean',
            'outcoming' => 'boolean',
        ]);

        $this->_service->update($request, $id);
        return redirect()->route('categories')->with('success', 'Categoría actualizada correctamente.');
    }

    public function destroy($id)
    {
        $this->_service->destroy($id);
        return redirect()->route('categories')->with('success', 'Categoría eliminada correctamente.');
    }
}
