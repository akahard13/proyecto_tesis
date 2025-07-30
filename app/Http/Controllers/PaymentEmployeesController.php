<?php

namespace App\Http\Controllers;

use App\Models\PaymentEmployees;
use App\Models\Employees;
use App\Services\PaymentEmployeesServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class PaymentEmployeesController extends Controller
{
    private $_service;

    public function __construct()
    {
        $this->_service = new PaymentEmployeesServices();
    }

    public function index(Employees $employee)
    {
        $employee->load('gender', 'jobPosition');
        $payments = (new PaymentEmployeesServices)->getPaymentEmployee($employee);

        return Inertia::render('PaymentEmployees/Main', [
            'employee' => $employee,
            'data' => $payments,
        ]);
    }

    public function create(Employees $employee)
    {
        $lastPayment = $this->_service->getLastPayment($employee);
        return Inertia::render('PaymentEmployees/Create', [
            'employee' => $employee,
            'defaultDate' => date('Y-m-d'),
        ]);
    }
    public function store(Request $request, Employees $employee)
    {
        try {
            $user = Auth::user();
            $request->validate([
                'employee_id' => ['required', 'exists:employees,id'],
                'payment_date' => ['required', 'date'],
                'amount' => ['required', 'numeric', 'min:0'],
                'description' => ['nullable', 'string', 'max:255'],
            ]);
            $this->_service->createPayment($request, $employee, $user);
            return redirect()->route('payments_employees', $employee->id)->with('success', 'Pago registrado exitosamente.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
    public function destroy(PaymentEmployees $payment)
    {
        try {
            $this->_service->destroy($payment);
            return redirect()->back()->with('success', 'Pago eliminado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'No se pudo eliminar el pago.']);
        }
    }
}