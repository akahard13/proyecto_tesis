<?php

namespace App\Services;

use App\Models\Catalogs\JobPositions;
use App\Models\Clients;
use App\Models\User;
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
            })->select('c.*', 'gen.name as gender', DB::raw('case when u.id is not null and u.deleted=false and u.active=true then true else false end as is_active'))
            ->where('c.deleted', false)
            ->where('c.active', true)->get();
    }

    public function update($request, $id)
    {
        $client = Clients::find($id);
        $client->name = ucfirst($request->name);
        $client->lastname = ucfirst($request->lastname);
        $client->birthday = $request->birthday;
        $client->inscription_day = $request->inscription_day;
        $client->gender_id = $request->gender_id;
        $client->code = $request->code;
        $client->cellphone = $request->cellphone;
        $client->save();
    }

    public function toggleLinkUser($id){
        $user= User::where('table_reference', 'client')->where('reference_id',$id)->first();
        $user->active=!$user->active;
        $user->deleted=!$user->deleted;
        $user->save();
        return $user;
    }
}

