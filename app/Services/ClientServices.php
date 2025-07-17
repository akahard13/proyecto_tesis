<?php

namespace App\Services;

use App\Models\Catalogs\JobPositions;
use Illuminate\Support\Facades\DB;

class ClientServices
{
    public function getClients()
    {
        return DB::table('clients as c')
        ->join('catalogs.gender as gen', 'gen.id', '=', 'c.gender_id')
        ->leftJoin('system.users as u', function ($join) {
            $join->on('u.reference_id', '=', 'c.id')
                ->where('u.table_reference', '=', 'client');
        })->select('c.*', 'gen.name as gender', DB::raw('case when u.id is not null then true else false end as is_active'))->get();
    }
}
