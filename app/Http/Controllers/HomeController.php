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
        $user = Auth::getUser();
        $calendar = $this->getCalendar(now()->year, now()->month, $user->reference_id);
        $anyos = $this->getYears();
        $meses = $this->getMonths();
        return Inertia::render('public/Home', [
            'calendario' => $calendar,
            'months' => $meses,
            'years' => $anyos,
            'current_year' => now()->year,
            'current_month' => now()->month
        ]);
    }
    public function changeCalendar(Request $request)
    {
        $calendar = $this->getCalendar($request->year, $request->month, Auth::user()->reference_id);
        $this->respuestaJson(['calendario' => $calendar], 200);
    }
    public function getCalendar($year, $month, $clientId)
    {
        $startOfMonth = Carbon::create($year, $month, 1);
        $endOfMonth = $startOfMonth->copy()->endOfMonth();

        $startDate = $startOfMonth->copy()->startOfWeek(1); //DOMINGO 0

        $endDate = $endOfMonth->copy()->endOfWeek(6); //SABADO 6

        $attendances = DB::table('attendances')
            ->where('client_id', $clientId)
            ->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
            ->pluck('date')
            ->map(fn($date) => Carbon::createFromFormat('Y-m-d', $date)->toDateString())
            ->toArray();
        $calendar = [];
        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $calendar[] = [
                'date' => $date->toDateString(),
                'day' => $date->translatedFormat('l'),
                'attended' => in_array($date->toDateString(), $attendances),
                'current_month' => $date->month === $startOfMonth->month,
            ];
        }
        
        return $calendar;
    }
    private function getYears()
    {
        $anyos = array_reverse(range(now()->year - 5, now()->year + 5));
        return $anyos;
    }
    private function getMonths()
    {
        $meses = [
            ['id' => 1, 'name' => 'Enero'],
            ['id' => 2, 'name' => 'Febrero'],
            ['id' => 3, 'name' => 'Marzo'],
            ['id' => 4, 'name' => 'Abril'],
            ['id' => 5, 'name' => 'Mayo'],
            ['id' => 6, 'name' => 'Junio'],
            ['id' => 7, 'name' => 'Julio'],
            ['id' => 8, 'name' => 'Agosto'],
            ['id' => 9, 'name' => 'Septiembre'],
            ['id' => 10, 'name' => 'Octubre'],
            ['id' => 11, 'name' => 'Noviembre'],
            ['id' => 12, 'name' => 'Diciembre'],
        ];
        return $meses;
    }
}
