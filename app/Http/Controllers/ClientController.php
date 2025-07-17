<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Gender;
use App\Models\Clients;
use App\Services\ClientServices;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    protected $rol = 2;
    private $_service;
    public function __construct()
    {
        $this->_service = new ClientServices();
    }
    public function index()
    {
        $clients = Clients::with('gender')->get();
        $clientes = $this->_service->getClients();
        return Inertia::render('Clients/Main', [
            'clients' => $clients
        ]);
    }
    public function create()
    {
        do {
            $code = rand(1000, 9999);
        } while (Clients::where('code', $code)->exists());

        return Inertia::render('Clients/Create', [
            'code' => $code,
            'inscription_date' => date('Y-m-d'),
            'genders' => Gender::all()
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'inscription_day' => 'required|date',
            'gender_id' => 'required|numeric',
            'code' => 'required|numeric',
            'cellphone' => 'required|numeric'
        ]);
        try {
            $cliente = $this->insertInto('clients', [
                'name' => ucfirst($request->name),
                'lastname' => ucfirst($request->lastname),
                'birthday' => $request->birthday,
                'inscription_day' => $request->inscription_day,
                'gender_id' => $request->gender_id,
                'code' => $request->code,
                'cellphone' => $request->cellphone
            ], true);
            $this->createUser($cliente, 'client', $request->name, $request->lastname, $request->email, $this->rol);
            return redirect()->route('clients',)->with('success', 'Cliente creado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function edit($id)
    {
        $client = Clients::find($id);

        return Inertia::render('Clients/Edit', [
            'client' => $client,
            'genders' => Gender::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'inscription_day' => 'required|date',
            'gender_id' => 'required|numeric',
            'code' => 'required|numeric',
            'cellphone' => 'required|numeric'
        ]);
        try {
            $this->_service->update($request, $id);
            return redirect()->route('clients',)->with('success', 'Cliente actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
