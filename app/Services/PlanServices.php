<?php

namespace App\Services;

use App\Models\Plans;
use App\Models\Prices;
use Illuminate\Support\Facades\DB;

class PlanServices
{
    public function getPlans()
    {
        $plans = DB::table('catalogs.plans as plan')
            ->leftJoin('prices as pr', 'pr.plan_id', '=', 'plan.id')
            ->leftJoin('catalogs.frequencies as fr', 'fr.id', '=', 'pr.frequency_id')
            ->select('plan.id', 'plan.name as name', DB::raw('lower(fr.name) as frequency'), 'pr.price')
            ->where('plan.deleted', false)
            ->where('plan.active', true)
            ->get();
        $groupedPlans = $this->_groupPlans($plans);
        return array_values($groupedPlans);
    }
    public function getPlanToEdit($plan)
    {
        $planes = DB::table('catalogs.plans as plan')
            ->leftJoin('prices as pr', 'pr.plan_id', '=', 'plan.id')
            ->leftJoin('catalogs.frequencies as fr', 'fr.id', '=', 'pr.frequency_id')
            ->select('plan.id', 'plan.name as name', DB::raw('lower(fr.name) as frequency'), 'pr.price')
            ->where('plan.id', $plan->id)
            ->where('plan.deleted', false)
            ->where('plan.active', true)
            ->get();
        $plan_grouped = $this->_groupPlans($planes);
        return $plan_grouped;
    }
    public function store($request)
    {
        $plan = new Plans();
        $plan->name = $request->name;
        $plan->save();
        $prices = [
            ['plan_id' => $plan->id, 'frequency_id' => 1, 'price' => (float)$request->mensual, 'created_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 2, 'price' => (float)$request->quincenal, 'created_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 3, 'price' => (float)$request->semanal, 'created_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 4, 'price' => (float)$request->diario, 'created_at' => now()],
        ];
        foreach ($prices as $price) {
            if (is_numeric($price['price']) && $price['price'] > 0) {
                DB::table('prices')->insert($price);
            }
        }
    }
    public function update($request, $plan)
    {
        $plan->name = $request->name;
        $plan->save();
        $prices = [
            ['plan_id' => $plan->id, 'frequency_id' => 1, 'price' => (float)$request->mensual, 'updated_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 2, 'price' => (float)$request->quincenal, 'updated_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 3, 'price' => (float)$request->semanal, 'updated_at' => now()],
            ['plan_id' => $plan->id, 'frequency_id' => 4, 'price' => (float)$request->diario, 'updated_at' => now()],
        ];
        foreach ($prices as $price) {
            $priceExist = Prices::where('plan_id', $plan->id)->where('frequency_id', $price['frequency_id'])->first();
            if ($priceExist) {
                if (is_numeric($price['price']) && $price['price'] > 0) {
                    $priceExist->price = $price['price'];
                    $priceExist->save();
                    continue;
                }
            }
        }
    }
    private function _groupPlans($plans)
    {
        $result = [];
        foreach ($plans as $plan) {
            $name = $plan->name;
            if (!isset($result[$name])) {
                $result[$name] = [
                    'name' => $name,
                    'id' => $plan->id
                ];
            }
            $result[$name][$plan->frequency] = $plan->price;
        }
        return array_values($result);
    }
    public function delete($plan)
    {
        $plan->active = false;
        $plan->deleted = true;
        $plan->save();
        $prices = Prices::where('plan_id', $plan->id)->get();
        foreach ($prices as $price) {
            $price->active = false;
            $price->deleted = true;
            $price->save();
        }
    }
}
