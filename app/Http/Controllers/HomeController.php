<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __construct()
    {
        Carbon::setLocale('es');
    }
    public function index()
    {
        $user=Auth::getUser();
        $calendar = $this->getCalendar(now()->year, now()->month, $user->id);
        return Inertia::render('public/Home', [ 
            'calendario' => $calendar,]);
    }

    public function getCalendar($year, $month, $clientId)
    {
        $startOfMonth = Carbon::create($year, $month, 1);
        $endOfMonth = $startOfMonth->copy()->endOfMonth();
        $attendances = DB::table('attendances')
            ->where('client_id', $clientId)
            ->whereBetween('date', [$startOfMonth->toDateString(), $endOfMonth->toDateString()])
            ->pluck('date')
            ->map(fn($date) => Carbon::createFromFormat('Y-m-d', $date)->toDateString())
            ->toArray();
        $calendar = [];
        for ($date = $startOfMonth->copy(); $date->lte($endOfMonth); $date->addDay()) {
            $calendar[] = [
                'date' => $date->toDateString(),
                'day' =>$date->translatedFormat('l'),
                'attended' => in_array($date->toDateString(), $attendances)
            ];
        }
        return $calendar;
    }
}
