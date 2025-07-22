import { Head, useForm, usePage } from '@inertiajs/react';
import Wrap from '@/Components/Wrap';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Form({ categories, finance = null, edit = false, title = 'Registrar Ingreso', button_text = 'Guardar Ingreso', default_date }) {
    const { data, setData, post, put, processing, errors } = useForm({
        category_id: finance?.category_id || '',
        description: finance?.description || '',
        amount: finance?.amount || '',
        registered_at: finance?.registered_at || default_date,
    });

    const submit = (e) => {
        e.preventDefault();
        if (edit) {
            put(route('incomings.update', finance.id));
        } else {
            post(route('incomings.store'));
        }
    };

    return (
        <Wrap header={title}>
            <form onSubmit={submit} className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="category_id" value="Categoría" />
                        <select
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="amount" value="Monto (C$)" />
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full border px-4 py-2 rounded"
                        />
                        <InputError message={errors.amount} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="registered_at" value="Fecha de registro" />
                        <input
                            id="registered_at"
                            name="registered_at"
                            type="date"
                            value={data.registered_at}
                            onChange={(e) => setData('registered_at', e.target.value)}
                            className="w-full border px-4 py-2 rounded"
                        />
                        <InputError message={errors.registered_at} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Descripción" />
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border px-4 py-2 rounded resize-none"
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                >
                    {button_text}
                </button>
            </form>

        </Wrap>
    );
}
