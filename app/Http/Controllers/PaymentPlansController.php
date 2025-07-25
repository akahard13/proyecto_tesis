<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Frequencies;
use App\Models\Clients;
use App\Models\PaymentPlans;
use App\Models\Plans;
use Illuminate\Validation\Rule;
use App\Services\PaymentPlansServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentPlansController extends Controller
{
    private $_service;
    public function __construct()
    {
        $this->_service = new PaymentPlansServices();
    }
    public function index(Clients $client)
    {
        $client->load('gender');
        return Inertia::render('PaymentsPlans/Main', [
            'client'   => $client,
            'data' => $this->_service->getPaymentPlan($client),
        ]);
    }

    public function create(Clients $client)
    {
        $lastPayment = $this->_service->getLastPayment($client);
        return Inertia::render('PaymentsPlans/Create', [
            'client' => $client,
            'plans' => Plans::where('deleted', false)->get(),
            'frequencies' => Frequencies::where('deleted', false)->get(),
            'lastPayment' => $lastPayment,
            'defaultDate' => date('Y-m-d'),
        ]);
    }


    public function store(Request $request, Clients $client)
    {
        try {
            $user = Auth::user();
            $request->validate([
                'plan' => [
                    'required',
                    function ($attribute, $value, $fail) {
                        $exists = DB::table('catalogs.plans')->where('id', $value)->exists();
                        if (!$exists) {
                            $fail('El plan seleccionado no existe.');
                        }
                    },
                ],
                'price'      => ['required', 'numeric', 'min:0'],
                'frequency'  => ['required', function ($attribute, $value, $fail) {
                    $exists = DB::table('catalogs.frequencies')->where('id', $value)->exists();
                    if (!$exists) {
                        $fail('La frecuencia de pago seleccionada no existe.');
                    }
                },],
                'start_date'  => ['required', 'date'],
                'end_date'    => ['required', 'date', 'after_or_equal:start_date'],
            ]);
            $this->_service->createPaymentPlan($request, $client, $user);
            return redirect()->route('payments_plans', $client->id)->with('success', 'Pago registrado.');
        } catch (Exception $e) {
            return $this->respuestaJson(['error' => $e->getMessage()], 500);
        }
    }

    /*public function edit(Clients $client, PaymentPlans $payment)
    {
        return Inertia::render('PaymentsPlans/Edit', [
            'client'  => $client,
            'payment' => $payment->only([
                'id',
                'plan',
                'price',
                'start_date',
                'end_date',
                'active',
                'deleted'
            ]),
            'plans'  => Plans::select('id', 'name')->get(),
            'prices' => Prices::select('id', 'amount', 'description')->get(),
        ]);
    }

    public function update(Request $request, Clients $client, PaymentPlans $payment)
    {
        $data = $request->validate([
            'plan'        => ['required', 'exists:plans,id'],
            'price'       => ['required', 'exists:prices,id'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['nullable', 'date', 'after_or_equal:start_date'],
            'active'      => ['required', 'boolean'],
        ]);

        $payment->update($data);

        return redirect()->route('clients.payments.index', $client)->with('success', 'Pago actualizado.');
    }*/

    public function getPricesPerPlan(Request $request)
    {
        $price = $this->_service->getPricePerPlan($request);
        return response()->json($price);
    }
    public function destroy(PaymentPlans $payment)
    {
        $this->_service->destroy($payment);
        return redirect()->route('payments_plans', $payment->client)->with('success', 'Pago eliminado.');
    }
}
