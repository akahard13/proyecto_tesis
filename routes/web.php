<?php

use App\Http\Controllers\Catalogs\JobPositionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IncomingsController;
use App\Http\Controllers\PaymentPlansController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\System\PermissionController;
use App\Http\Controllers\Catalogs\CategoriesController;
use App\Http\Controllers\OutgoingsController;
use App\Http\Controllers\PaymentEmployeesController;
use App\Models\Outcomings;
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
    // EMPLOYEES ROUTES
    Route::get('/employees', [EmployeesController::class, 'index'])->name('employees');
    Route::get('/employees/create', [EmployeesController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeesController::class, 'store'])->name('employees.store');
    Route::get('/employees/{employee}/edit', [EmployeesController::class, 'edit'])->name('employees.edit');
    Route::put('/employees/{employee}', [EmployeesController::class, 'update'])->name('employees.update');
    Route::delete('/employees/{employee}', [EmployeesController::class, 'delete'])->name('employees.delete');
    //PLANS ROUTES
    Route::get('/plans', [PlansController::class, 'index'])->name('plans');
    Route::get('/plans/create', [PlansController::class, 'create'])->name('plans.create');
    Route::get('/plans/{plan}/edit', [PlansController::class, 'edit'])->name('plans.edit');
    Route::put('/plans/{plan}/update', [PlansController::class, 'update'])->name('plans.update');
    Route::delete('/plans/{plan}/delete', [PlansController::class, 'delete'])->name('plans.delete');
    Route::post('/plans/store', [PlansController::class, 'store'])->name('plans.store');
    // CATEGORIES ROUTES
    Route::get('/categories', [CategoriesController::class, 'index'])->name('categories');
    Route::get('/categories/create', [CategoriesController::class, 'create'])->name('categories.create');
    Route::get('/categories/{id}/edit', [CategoriesController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{id}/update', [CategoriesController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}/delete', [CategoriesController::class, 'destroy'])->name('categories.destroy');
    Route::post('/categories/store', [CategoriesController::class, 'store'])->name('categories.store');
    //INCOMINGS ROUTES
    Route::get('/incomings', [IncomingsController::class, 'index'])->name('incomings');
    Route::get('/incomings/create', [IncomingsController::class, 'create'])->name('incomings.create');
    Route::get('/incomings/{incoming}/edit', [IncomingsController::class, 'edit'])->name('incomings.edit');
    Route::put('/incomings/{incoming}/update', [IncomingsController::class, 'update'])->name('incomings.update');
    Route::delete('/incomings/{incoming}/delete', [IncomingsController::class, 'delete'])->name('incomings.delete');
    Route::post('/incomings/store', [IncomingsController::class, 'store'])->name('incomings.store');
    //OUTCOMINGS ROUTES
    Route::get('/outgoings', [OutgoingsController::class, 'index'])->name('outgoings');
    Route::get('/outgoings/create', [OutgoingsController::class, 'create'])->name('outgoings.create');
    Route::get('/outgoings/{outgoing}/edit', [OutgoingsController::class, 'edit'])->name('outgoings.edit');
    Route::put('/outgoings/{outgoing}/update', [OutgoingsController::class, 'update'])->name('outgoings.update');
    Route::delete('/outgoings/{outgoing}/delete', [OutgoingsController::class, 'delete'])->name('outgoings.delete');
    Route::post('/outgoings/store', [OutgoingsController::class, 'store'])->name('outgoings.store');
    //PAYMENTS PLANS ROUTES
    Route::get('/payments_plans/{client}', [PaymentPlansController::class, 'index'])->name('payments_plans');
    Route::get('/payments_plans/create/{client}', [PaymentPlansController::class, 'create'])->name('payments_plans.create');
    Route::post('/payments_plans/{client}', [PaymentPlansController::class, 'store'])->name('payments_plans.store');
    Route::get('/payments_plans/{payment}/edit', [PaymentPlansController::class, 'edit'])->name('payments_plans.edit');
    Route::put('/payments_plans/{payment}', [PaymentPlansController::class, 'update'])->name('payments_plans.update');
    Route::delete('/payments_plans/{payment}', [PaymentPlansController::class, 'destroy'])->name('payments_plans.destroy');
    Route::post('/payments_plans/prices/get', [PaymentPlansController::class, 'getPricesPerPlan'])->name('payments_plans.prices');
    //PAYMENT EMPLOYEES ROUTES
    Route::get('/payments_employees/{employee}', [PaymentEmployeesController::class, 'index'])->name('payments_employees');
    Route::get('/payments_employees/create/{employee}', [PaymentEmployeesController::class, 'create'])->name('payments_employees.create');
    Route::post('/payments_employees/store/{employee}', [PaymentEmployeesController::class, 'store'])->name('payments_employees.store');
    Route::delete('/payments_employees/{payment}', [PaymentEmployeesController::class, 'destroy'])->name('payments_employees.destroy');
    Route::get('/payments_employees/{id}/receipt', [PaymentEmployeesController::class, 'receipt'])->name('payments_employees.receipt');

});

require __DIR__ . '/auth.php';
