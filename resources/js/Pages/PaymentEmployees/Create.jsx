import { useForm, usePage } from '@inertiajs/react';
import Wrap from '@/Components/Wrap';

export default function Create() {
    const { employees, defaultDate, errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        employee_id: '',
        payment_date: defaultDate,
        amount: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payments_employees.store'));
    };

    return (
        <Wrap header="Registrar Pago a Empleado">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Empleado</label>
                    <select
                        value={data.employee_id}
                        onChange={(e) => setData('employee_id', e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Seleccione...</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} {emp.lastname}
                            </option>
                        ))}
                    </select>
                    {errors.employee_id && <div className="text-red-500 text-sm mt-1">{errors.employee_id}</div>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Fecha de Pago</label>
                    <input
                        type="date"
                        value={data.payment_date}
                        onChange={(e) => setData('payment_date', e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.payment_date && <div className="text-red-500 text-sm mt-1">{errors.payment_date}</div>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Monto</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Descripción</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-factor-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Guardar Pago
                    </button>
                </div>
            </form>
        </Wrap>
    );
}