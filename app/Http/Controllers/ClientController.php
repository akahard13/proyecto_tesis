<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Gender;
use App\Models\Clients;
use App\Services\ClientServices;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


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
        //$clients = Clients::with('gender')->where('active', true)->where('deleted', false)->orderBy('id', 'asc')->get();
        $clients = $this->_service->getClients();
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'inscription_day' => 'required|date',
            'gender_id' => 'required|numeric',
            'code' => 'required|numeric',
            'cellphone' => 'required|numeric'
        ]);

        try {
            $path = $request->file('image')->store('uploads', 'public');
            $url = Storage::url($path);
            $cliente = $this->insertInto('clients', [
                'image' => env('APP_URL') . $url,
                'name' => ucfirst($request->name),
                'lastname' => ucfirst($request->lastname),
                'birthday' => $request->birthday,
                'inscription_day' => $request->inscription_day,
                'gender_id' => $request->gender_id,
                'code' => $request->code,
                'cellphone' => $request->cellphone
            ], true);
            $this->createUser($cliente, 'client', $request->name, $request->lastname, $request->email, $this->rol);
            return redirect()->route('clients')->with('success', 'Cliente creado correctamente.');
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

    public function update(Request $request, Clients $client)
    {
        $request->validate([
            'new_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'inscription_day' => 'required|date',
            'gender_id' => 'required|numeric',
            'code' => 'required|numeric',
            'cellphone' => 'required|numeric'
        ]);
        try {
            $img = null;
            if ($request->new_image) {
                $path = $request->file('new_image')->store('uploads', 'public');
                $url = Storage::url($path);
                $img = env('APP_URL') . $url;
            }

            $this->_service->update($request, $img, $client->id);
            return redirect()->route('clients',)->with('success', 'Cliente actualizado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
    public function delete($id)
    {
        try {
            $client = Clients::find($id);
            $client->active = false;
            $client->deleted = true;
            $client->save();
            return redirect()->route('clients',)->with('success', 'Cliente eliminado correctamente.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }

    public function toggleLinkUser($id)
    {
        try {
            $user = $this->_service->toggleLinkUser($id);
            if ($user->active)
                return redirect()->route('clients',)->with('success', 'Usuario activado correctamente para el cliente ' . $user->name . ' ' . $user->lastname);
            else
                return redirect()->route('clients',)->with('success', 'Usuario desactivado correctamente para el cliente ' . $user->name . ' ' . $user->lastname);
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }
}
