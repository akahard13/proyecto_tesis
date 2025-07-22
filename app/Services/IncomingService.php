<?php

namespace App\Services;

use App\Models\Catalogs\Categories;
use App\Models\Incomings;
use App\Models\PaymentPlans;
use DragonCode\Contracts\Cashier\Config\Payment;
use Illuminate\Support\Facades\DB;

class IncomingService
{
    public function getIncomings()
    {
        return DB::table('incomings as i')
            ->join('catalogs.categories as c', 'c.id', '=', 'i.category_id')
            ->select('i.*', 'c.name as category')
            ->where('i.deleted', false)
            ->where('i.active', true)->get();
    }

    public function getIncomingsCategories()
    {
        return Categories::where('incoming', true)
            ->where('active', true)
            ->where('deleted', false)
            ->get();
    }

    public function store($data)
    {
        $incoming = new Incomings([
            'category_id' => $data->category_id,
            'amount' => $data->amount,
            'registered_at' => $data->registered_at,
            'description' => $data->description
        ]);
        $incoming->save();
        return $incoming;
    }
    public function update($data, $incoming)
    {
        $incoming->category_id = $data->category_id;
        $incoming->amount = $data->amount;
        $incoming->registered_at = $data->registered_at;
        $incoming->description = $data->description;
        $incoming->save();
        return $incoming;
    }
    public function delete($incoming)
    {
        $paymentplan = PaymentPlans::where('id', $incoming->payment_plan_id)->first();
        if ($paymentplan) {
            $paymentplan->deleted = true;
            $paymentplan->active = false;
            $paymentplan->save();
            $nextPlan = PaymentPlans::where('id', '!=', $paymentplan->id)
                ->where('deleted', false)
                ->where('client', $paymentplan->client)
                ->orderByDesc('id')
                ->first();
            if ($nextPlan) {
                $nextPlan->active = true;
                $nextPlan->save();
            }
        }
        $incoming->deleted = true;
        $incoming->save();
        return $incoming;
    }
}
