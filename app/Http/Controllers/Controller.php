<?php

namespace App\Http\Controllers;

use Date;
use DateTime;
use Illuminate\Support\Facades\DB;

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
                    $date=new DateTime($object->$field);
                    $object->$field = $date->format('Y-m-d');
                }
            }
        }
    }
    public function insertInto($table, $values=[]){
        DB::table($table)->insert($values);
    }
}
