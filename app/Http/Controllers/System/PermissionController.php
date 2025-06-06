<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\Permissions;
use App\Models\System\Roles;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    private $_service;
    public function __construct()
    {
        $this->_service = new PermissionService();
    }
    public function index()
    {
        $roles = Roles::where(['active' => true, 'deleted' => false])->get();
        $permissions = Permissions::where(['active' => true, 'deleted' => false])->get();
        return Inertia::render('Permission/Main', [
            'roles' => $roles,
            'permissions_list' => $permissions
        ]);
    }
    public function edit($id)
    {
        $roles = Roles::find($id);
        $permission = $this->_service->getPermissions($id);
        return Inertia::render('Permission/Edit', [
            'roles' => $roles,
            'permission_list' => array_values($permission)
        ]);
    }
    public function store(Request $request)
    {
        $this->_service->store($request->data);
        return redirect()->route('permissions.edit', $request->data[0]['rol_id'])->with('success', 'Permisos actualizados');
    }

    public function create()
    {
        return Inertia::render('Permission/Create');
    }
    public function store_permission(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $this->_service->store_permission($request->name);
        return redirect()->route('permissions')->with('success', 'Permiso creado');
    }
}
