<?php

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

    //Permissions ROUTES
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions');
    Route::get('/permissions/{id}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::post('/permissions/update', [PermissionController::class, 'store'])->name('permissions.store');
    Route::post('/permissions/store_permission', [PermissionController::class, 'store_permission'])->name('permissions.store_permission');
    Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
    //Home ROUTES
    Route::get('/home', [HomeController::class, 'index'])->name('home');
});

require __DIR__ . '/auth.php';
