import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Wrap from '@/Components/Wrap';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { getEndDate } from '@/Utils/GetDates';

export default function Create({ client, plans, frequencies = [], lastPayment, defaultDate }) {
    const start_date = lastPayment?.end_date
        ? (() => {
            const date = new Date(lastPayment.end_date);
            date.setDate(date.getDate() + 1);
            return date.toISOString().slice(0, 10);
        })()
        : defaultDate;
    const { data, setData, post, processing, errors, reset } = useForm({
        client: client.id,
        plan: lastPayment?.plan ?? '',
        frequency: lastPayment?.frequency_id ?? '',
        price: lastPayment?.amount ?? '',
        discount: '0.00',
        discount_type: 'moneda',
        start_date: start_date,
        end_date: '',
        user_maker: usePage().props.auth.user.id,
        active: true,
        deleted: false,
        registered_at: defaultDate,
    });
    useEffect(() => {
        if (lastPayment?.amount) {
            setBasePrice(lastPayment.amount);
            setFinalPrice(lastPayment.amount);
            setData('price', lastPayment.amount);
        }
    }, [lastPayment]);
    const [basePrice, setBasePrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payments_plans.store', client.id), {
            onSuccess: () => reset(),
        });
    };

    const handlePlanOrFrequencyChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        const updatedData = { ...data, [name]: value };

        if (updatedData.plan && updatedData.frequency) {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch(`/payments_plans/prices/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                body: JSON.stringify({
                    plan: updatedData.plan,
                    frequency: updatedData.frequency,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res && res.price !== undefined) {
                        setData('price', res.price);
                        setBasePrice(res.price);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching price:', error);
                });
        }
    };

    const handleDiscountChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    useEffect(() => {
        let final = parseFloat(basePrice) || 0;
        let discount = parseFloat(data.discount) || 0;

        if (data.discount_type === 'moneda') {
            final = final - discount;
        } else if (data.discount_type === 'porcentaje') {
            final = final - (final * (discount / 100));
        }

        setFinalPrice(final < 0 ? 0 : final);
    }, [basePrice, data.discount, data.discount_type]);
    useEffect(() => {
        if (data.start_date && data.frequency) {
            const nuevaFechaVencimiento = getEndDate(data.start_date, data.frequency);
            setData('end_date', nuevaFechaVencimiento);
        }
    }, [data.start_date, data.frequency]);
    return (
        <Wrap header="Nuevo Pago">
            <Head title="Nuevo Pago" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <InputLabel htmlFor="client" value="Cliente" />
                    <select
                        name="client"
                        value={data.client}
                        disabled
                        className="border rounded px-4 py-2 bg-slate-100 text-slate-600 cursor-not-allowed"
                    >
                        <option value={client.id}>{client.name} {client.lastname}</option>
                    </select>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="plan" value="Servicio / Plan" />
                        <select
                            name="plan"
                            value={data.plan}
                            onChange={handlePlanOrFrequencyChange}
                            className="border rounded px-4 py-2"
                            required
                        >
                            <option value="">Seleccione un plan</option>
                            {plans.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.plan} />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="frequency" value="Frecuencia de pago" />
                        <select
                            name="frequency"
                            value={data.frequency}
                            onChange={handlePlanOrFrequencyChange}
                            className="border rounded px-4 py-2"
                            required
                        >
                            <option value="">Seleccione una frecuencia</option>
                            {frequencies.map((f) => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.frequency} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="price" value="Precio base" />
                        <input
                            type="text"
                            name="price"
                            value={Number(data.price).toFixed(2)}
                            readOnly
                            className="border rounded px-4 py-2 bg-gray-100 text-gray-600"
                        />
                        <InputError message={errors.price} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="discount" value="Descuento" />
                        <input
                            type="number"
                            name="discount"
                            value={data.discount}
                            onChange={handleDiscountChange}
                            className="border rounded px-4 py-2"
                            min="0"
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="discount_type" value="Tipo de descuento" />
                        <select
                            name="discount_type"
                            value={data.discount_type}
                            onChange={handleDiscountChange}
                            className="border rounded px-4 py-2"
                        >
                            <option value="moneda">Moneda (C$)</option>
                            <option value="porcentaje">Porcentaje (%)</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="final_price" value="Precio final" />
                        <input
                            type="text"
                            value={finalPrice.toFixed(2)}
                            readOnly
                            className="border rounded px-4 py-2 bg-gray-100 text-black font-bold"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="start_date" value="Fecha de inicio" />
                        <input
                            type="date"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="border rounded px-4 py-2"
                            required
                        />
                        <InputError message={errors.start_date} />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="end_date" value="Fecha de vencimiento" />
                        <input
                            type="date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="border rounded px-4 py-2"
                            required
                        />
                        <InputError message={errors.end_date} />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="end_date" value="Fecha de registro" />
                        <input
                            type="date"
                            name="registered_at"
                            value={data.registered_at}
                            onChange={(e) => setData('registered_at', e.target.value)}
                            className="border rounded px-4 py-2"
                            required
                        />
                        <InputError message={errors.registered_at} />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-6 py-2 rounded"
                    >
                        Registrar Pago
                    </button>
                </div>
            </form>
        </Wrap>
    );
}
