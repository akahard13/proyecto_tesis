<?php

namespace App\Services;

use App\Models\PaymentEmployees;
use App\Models\Employees;
use App\Models\Outgoings;
use Illuminate\Support\Facades\DB;

class PaymentEmployeesServices
{
    public function getAllPayments()
    {
        return PaymentEmployees::with('employee')
            ->where('deleted', false)
            ->get();
    }
    public function getPaymentEmployee(Employees $employee)
    {
        return PaymentEmployees::where('employee', $employee->id)
            ->where('deleted', false)
            ->orderBy('payment_date', 'desc')
            ->get(['id', 'payment_date', 'amount', 'description']);
    }
    public function getLastPayment(Employees $employee)
    {
        return PaymentEmployees::where('employee', $employee->id)
            ->where('deleted', false)
            ->orderBy('payment_date', 'desc')
            ->first();
    }

    public function createPayment($data, $Employee, $Outgoings)
    {
        $payment = new PaymentEmployees();
        $payment->payment_date = $data['payment_date'];
        $payment->employee = $Employee->id;
        $payment->amount = $data['amount'];
        $payment->description = $data['description'];
        $payment->save();

        // guardar el registro de egreso
        $outgoing = new Outgoings();
        $outgoing->date = $data['payment_date'];
        $outgoing->amount = $data['amount'];
        $outgoing->description = $data['description'];
        $outgoing->payment_employee_id = $payment->id;
        $outgoing->save();

        return $payment;
    }

    public function destroy($payment)
    {
        $payment->active = false;
        $payment->deleted = true;
        $payment->save();

        $outgoing = Outgoings::where('payment_employee_id', $payment->id)
            ->where('amount', $payment->amount)
            ->where('description', $payment->description)
            ->first();

        if ($outgoing) {
            $outgoing->deleted = true;
            $outgoing->save();
        }
    }
}
