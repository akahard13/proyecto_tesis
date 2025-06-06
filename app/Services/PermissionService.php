<?php

namespace App\Services;

use App\Models\System\Permissions;
use App\Models\System\PermissionsGranted;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class PermissionService
{
    public function getPermissions($rol_id)
    {
        $data = DB::table('system.pages as p')
            ->crossJoin('system.permissions as pm')
            ->leftJoin('system.permissions_granted as pg', function ($join) use ($rol_id) {
                $join->on('pg.page_id', '=', 'p.id')
                    ->on('pg.permission_id', '=', 'pm.id')
                    ->where('pg.rol_id', $rol_id)
                    ->where('pg.active', true);
            })
            ->leftJoin('system.roles as rol', function ($join) {
                $join->on('rol.id', '=', 'pg.rol_id')
                    ->where('rol.active', true);
            })
            ->select(
                'p.id as page_id',
                'p.name as page_name',
                'pm.id as permission_id',
                'pm.name as permission_name',
                'rol.id as rol_id',
                'rol.name as rol_name',
                DB::raw('CASE WHEN pg.id IS NOT NULL THEN true ELSE false END as checked')
            )
            ->where('p.active', true)
            ->where('pm.active', true)
            ->orderBy('p.id', 'asc')
            ->get();

        $permissionsGrouped = [];

        foreach ($data as $perm) {
            $pageName = $perm->page_name;

            if (!isset($permissionsGrouped[$pageName])) {
                $permissionsGrouped[$pageName] = [
                    'page_id' => $perm->page_id,
                    'page_name' => $pageName,
                    'permissions' => []
                ];
            }

            $permissionsGrouped[$pageName]['permissions'][] = [
                'permission_id' => $perm->permission_id,
                'permission_name' => $perm->permission_name,
                'checked' => (bool) $perm->checked,
            ];
        }

        return $permissionsGrouped;
    }

    public function store(array $permission_list)
    {
        $permission_list = Collection::make($permission_list);
        foreach ($permission_list as $permission) {
            if ($permission['page_id'] !== '2') {
                $checked = (bool) $permission['checked'];
                $existsPermission = DB::table('system.permissions_granted')
                    ->where('page_id', $permission['page_id'])
                    ->where('permission_id', $permission['permission_id'])
                    ->where('rol_id', $permission['rol_id'])
                    ->first();
                if ($existsPermission) {
                    if ($existsPermission->active != $checked) {
                        DB::table('system.permissions_granted')
                            ->where('id', $existsPermission->id)
                            ->update(['active' => $checked, 'updated_at' => now()]);
                    }
                } else {
                    $permiso=new PermissionsGranted();
                    $permiso->page_id=$permission['page_id'];
                    $permiso->permission_id=$permission['permission_id'];
                    $permiso->rol_id=$permission['rol_id'];
                    $permiso->active=$checked;
                    $permiso->save();
                    // DB::table('system.permissions_granted')->insert([
                    //     'page_id' => $permission['page_id'],
                    //     'permission_id' => $permission['permission_id'],
                    //     'rol_id' => $permission['rol_id'],
                    //     'active' => $checked,
                    //     'created_at' => now(),
                    // ]);
                }
            }
        }
    }

    public function store_permission($permiso)
    {
        $permiso = new Permissions([
            'name' => $permiso,
            'created_at' => now(),
        ]);
        $permiso->save();
    }
}
