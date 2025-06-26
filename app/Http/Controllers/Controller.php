<?php

namespace App\Http\Controllers;

use App\Models\User;
use Date;
use DateTime;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
abstract class Controller
{
    public function respuestaJson($data, $status = 200)
    {
        return response()->json($data, $status);
    }
    public function formatCustomDate(&$arrays, $fields = [])
    {
        foreach ($arrays as &$object) {
            foreach ($fields as $field) {
                if (isset($object->$field)) {
                    $date = new DateTime($object->$field);
                    $object->$field = $date->format('Y-m-d');
                }
            }
        }
    }
    public function insertInto($table, $values = [], $returning = false)
    {
        DB::table($table)->insert($values);
        if ($returning) {
            return DB::getPdo()->lastInsertId();
        }
    }
    public function createUser($id, $table_reference, $name, $lastname, $email = null, $rol)
    {
        $username = $this->generateUsername($name, $lastname);
        $password = Hash::make("Temp#2025");
        $user = User::create([
            'reference_id' => $id,
            'username' => $username,
            'email' => $email,
            'rol_id' => $rol,
            'password' => $password,
            'table_reference' => $table_reference,
            'created_at' => now()
        ]);
        return $user;
    }
    function generateUsername($name, $lastname)
    {
        $base = strtolower(str::substr($name, 0, 1) . Str::slug($lastname, ''));
        $username = $base;
        $counter = 1;
        while (DB::table('system.users')->where('username', $username)->exists()) {
            $username = $base . $counter;
            $counter++;
        }
        return $username;
    }
}
