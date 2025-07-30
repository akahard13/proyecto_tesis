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
        return DB::table('payments_employees as pem')
            ->join('outgoings as out', 'out.payment_employee_id', '=', 'pem.id')
            ->where('pem.deleted', false)
            ->where('out.deleted', false);
    }
    public function getPaymentEmployee(Employees $employee)
    {
        return DB::table('payment_employees as pem')
            ->join('outgoings as out', 'out.payment_employee_id', '=', 'pem.id')
            ->where('pem.deleted', false)
            ->where('out.deleted', false)
            ->where('pem.employee', $employee->id)
            ->orderBy('pem.payment_date', 'desc')
            ->get(['pem.id', 'pem.payment_date', 'pem.amount', 'pem.description']);
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
        $outgoing->registered_at = $data['payment_date'];
        $outgoing->category_id = 3;
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
