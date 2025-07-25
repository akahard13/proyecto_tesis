<?php

namespace App\Services;

use App\Models\Catalogs\Frequencies;
use App\Models\Incomings;
use App\Models\PaymentPlans;
use App\Models\Plans;
use App\Models\Prices;
use Illuminate\Support\Facades\DB;

class PaymentPlansServices
{
    public function getPaymentPlan($client)
    {
        $plan = DB::table('payments_plans as pay')
            ->join('catalogs.plans as p', 'p.id', '=', 'pay.plan')
            ->join('catalogs.frequencies as f', 'f.id', '=', 'pay.frequency_id')
            ->select('pay.id', 'p.name as plan', 'f.name as frequency', 'pay.start_date', 'pay.end_date', 'pay.amount', 'pay.active', 'pay.deleted')
            ->where('pay.deleted', false)
            ->where('client', $client->id)->get();
        return $plan;
    }
    public function getPricePerPlan($request)
    {
        $price = Prices::where('plan_id', $request->plan)
            ->select('price')
            ->where('frequency_id', $request->frequency)
            ->where('deleted', false)
            ->first();
        return $price;
    }
    public function getLastPayment($client)
    {
        $lastPayment = PaymentPlans::where('client', $client->id)
            ->where('active', true)
            ->first();
        return $lastPayment;
    }

    public function createPaymentPlan($data, $client, $user)
    {
        //Recursos
        $plan = Plans::find($data->plan);
        $frequency = Frequencies::find($data->frequency);
        //seteando todos los pagos de este cliente a false
        PaymentPlans::where('client', $client->id)->update(['active' => false]);
        //guardando pago
        $paymentPlan = new PaymentPlans();
        $paymentPlan->client = $client->id;
        $paymentPlan->plan = $data->plan;
        $paymentPlan->frequency_id = $data->frequency;
        $paymentPlan->start_date = $data->start_date;
        $paymentPlan->end_date = $data->end_date;
        $paymentPlan->amount = $data->price;
        $paymentPlan->active = true;
        $paymentPlan->user_maker = $user->id;
        $paymentPlan->save();
        //guardando ingreso
        $incoming = new Incomings();
        $incoming->payment_plan_id = $paymentPlan->id;
        $incoming->category_id = 1;
        $incoming->amount = $data->price;
        $incoming->registered_at = $data->start_date;
        $incoming->description = 'Pago correspondiente a ' . $client->name . ' en concepto de plan ' . $frequency->name . ' de ' . $plan->name . '.';
        $incoming->save();
    }
    public function destroy($payment)
    {
        $payment->active = false;
        $payment->deleted = true;
        $payment->save();
        $nextPlan = PaymentPlans::where('id', '!=', $payment->id)
            ->where('deleted', false)
            ->where('client', $payment->client)
            ->orderByDesc('id')
            ->first();
        if ($nextPlan) {
            $nextPlan->active = true;
            $nextPlan->save();
        }
        $incoming = Incomings::where('payment_plan_id', $payment->id)->first();
        if ($incoming) {
            $incoming->deleted = true;
            $incoming->save();
        }
    }
}
