import { useForm, usePage } from '@inertiajs/react';
import Wrap from '@/Components/Wrap';

export default function Create() {
    const { employee, defaultDate, errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        employee_id: employee.id || '',
        payment_date: defaultDate,
        amount: '',
        description: '',
        salary: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('payments_employees.store', employee.id));
    };
    const handleSalarioChange = (e) => {
        const checked = e.target.checked;
        setData('salary', checked);
        if (checked) {
            setData('amount', employee.salary);
            setData('description', `Pago de salario correspondiente a ${employee.name} ${employee.lastname}`);
        } else {
            setData('monto', '0.00');
            setData('descripcion', '');
        }
    };
    return (
        <Wrap header="Registrar Pago a Empleado">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto  p-6 rounded ">
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Empleado</label>
                    <select
                        value={data.employee_id}
                        onChange={(e) => setData('employee_id', e.target.value)}
                        className="w-full border px-3 py-2 rounded" disabled>
                        <option value="">Seleccione...</option>
                        <option value={employee.id}>{employee.name} {employee.lastname}</option>
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
                <div className="col-span-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="salario"
                            checked={data.salario}
                            onChange={handleSalarioChange}
                            className="mr-2 rounded-md w-6 h-6"
                        />
                        <label htmlFor="salario" className="font-semibold">Marcar si es pago de salario</label>
                    </div>
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