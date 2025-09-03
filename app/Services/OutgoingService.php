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
        return Categories::where('outgoing', true)
            ->where('active', true)
            ->where('deleted', false)
            ->get();
    }

    public function store($data)
    {
        $outgoing = new Outgoings([
            'category_id' => $data->category_id,
            'amount' => $data->amount,
            'registered_at' => $data->registered_at,
            'description' => $data->description
        ]);
        $outgoing->save();
        return $outgoing;
    }
    public function update($data, $outgoing)
    {
        $outgoing->category_id = $data->category_id;
        $outgoing->amount = $data->amount;
        $outgoing->registered_at = $data->registered_at;
        $outgoing->description = $data->description;
        $outgoing->save();
        return $outgoing;
    }
    public function delete($outgoing)
    {
        //$paymentemployee = PaymentPlans::where('id', $outgoing->payment_employee_id)->first();
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
        $outgoing->deleted = true;
        $outgoing->save();
        return $outgoing;
    }
}
