<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function respuestaJson($data, $status = 200)
    {
        return response()->json($data, $status);
    }
}
