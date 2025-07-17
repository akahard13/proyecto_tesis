<?php

use App\Http\Controllers\Catalogs\JobPositionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\System\PermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/restricted', function () {
    return Inertia::render('Restriction');
})->middleware(['auth', 'verified'])->name('restricted');
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //JobPosition ROUTES
    Route::get('/job_positions', [JobPositionController::class, 'index'])->name('job_positions');
    Route::get('/job_positions/create', [JobPositionController::class, 'create'])->name('job_positions.create');
    Route::get('/job_positions/{id}/edit', [JobPositionController::class, 'edit'])->name('job_positions.edit');
    Route::put('/job_positions/{id}/update', [JobPositionController::class, 'update'])->name('job_positions.update');
    Route::post('/job_positions/store', [JobPositionController::class, 'store'])->name('job_positions.store');
    //Permissions ROUTES
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions');
    Route::get('/permissions/{id}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::put('/permissions/{id}/update', [PermissionController::class, 'store'])->name('permissions.store');
    Route::post('/permissions/store_permission', [PermissionController::class, 'store_permission'])->name('permissions.store_permission');
    Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
    //Home ROUTES
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/home/calendar/{year}/{month}', [HomeController::class, 'changeCalendar'])->name('calendar');
    //CLIENTS ROUTES
    Route::get('/clients', [ClientController::class, 'index'])->name('clients');
    Route::get('/clients/create', [ClientController::class, 'create'])->name('clients.create');
    Route::get('/clients/{id}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::put('/clients/{id}/update', [ClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{id}/delete', [ClientController::class, 'delete'])->name('clients.delete');
    Route::post('/clients/store', [ClientController::class, 'store'])->name('clients.store');
    Route::put('/clients/{id}/toggle_user', [ClientController::class, 'toggleLinkUser'])->name('clients.toggle_user');
});

require __DIR__ . '/auth.php';
