<?php

namespace App\Traits;

use App\Models\System\Permissions;
use App\Models\System\Roles;
use App\Models\User;
use Illuminate\Support\Facades\DB;

trait HasPermissions
{
    public function getCustomPermissions($user_id)
    {
        return DB::table('system.permissions_granted AS pg')
            ->join('system.permissions as pm', 'pg.permission_id', '=', 'pm.id')
            ->join('system.pages as p', 'pg.page_id', '=', 'p.id')
            ->join('system.users as u', 'pg.rol_id', '=', 'u.rol_id')
            ->where('u.id', $user_id)
            ->selectRaw("CONCAT(p.slug, '.', pm.name) as permission_name, p.name as page_name")
            ->get()
            ->toArray();
    }

    public function validatePermission($permissionName, $user_id)
    {
        return DB::table('system.permissions_granted AS pg')
            ->join('system.permissions as pm', 'pg.permission_id', '=', 'pm.id')
            ->join('system.pages as p', 'pg.page_id', '=', 'p.id')
            ->join('system.users as u', 'pg.rol_id', '=', 'u.rol_id')
            ->where('u.id', $user_id)
            ->whereRaw("CONCAT(p.slug, '.', pm.name) = ?", [$permissionName])
            ->selectRaw("CONCAT(p.slug, '.', pm.name) as permission_name")
            ->pluck('permission_name')
            ->toArray();
    }
}
