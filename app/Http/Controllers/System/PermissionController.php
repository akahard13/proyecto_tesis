<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\Permissions;
use App\Models\System\Roles;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        $roles= Roles::where(['active' => true, 'deleted' => false])->get();
        $permissions = Permissions::where(['active' => true, 'deleted' => false])->get();
        return Inertia::render('Permission/Main', [
            'roles' => $roles,
            'permissions_list' => $permissions
        ]);
    }
}
