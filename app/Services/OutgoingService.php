<?php

namespace App\Services;

use App\Models\Catalogs\Categories;
use App\Models\Outgoings;
use App\Models\PaymentPlans;
use DragonCode\Contracts\Cashier\Config\Payment;
use Illuminate\Support\Facades\DB;

class OutgoingService
{
    public function getOutgoings()
    {
        return DB::table('outgoings as o')
            ->join('catalogs.categories as c', 'c.id', '=', 'o.category_id')
            ->select('o.*', 'c.name as category')
            ->where('o.deleted', false)
            ->where('o.active', true)->get();
    }

    public function getOutgoingsCategories()
    {
        return Categories::where('outcoming', true)
            ->where('active', true)
            ->where('deleted', false)
            ->get();
    }

    public function store($data)
    {
        $outcoming = new Outgoings([
            'category_id' => $data->category_id,
            'amount' => $data->amount,
            'registered_at' => $data->registered_at,
            'description' => $data->description
        ]);
        $outcoming->save();
        return $outcoming;
    }
    public function update($data, $outcoming)
    {
        $outcoming->category_id = $data->category_id;
        $outcoming->amount = $data->amount;
        $outcoming->registered_at = $data->registered_at;
        $outcoming->description = $data->description;
        $outcoming->save();
        return $outcoming;
    }
    public function delete($outcoming)
    {
        //$paymentemployee = PaymentPlans::where('id', $outcoming->payment_employee_id)->first();
        // if ($paymentplan) {
        //     $paymentplan->deleted = true;
        //     $paymentplan->active = false;
        //     $paymentplan->save();
        //     $nextPlan = PaymentPlans::where('id', '!=', $paymentplan->id)
        //         ->where('deleted', false)
        //         ->where('client', $paymentplan->client)
        //         ->orderByDesc('id')
        //         ->first();
        //     if ($nextPlan) {
        //         $nextPlan->active = true;
        //         $nextPlan->save();
        //     }
        // }
        $outcoming->deleted = true;
        $outcoming->save();
        return $outcoming;
    }
}
