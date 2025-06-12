import Wrap from '@/Components/Wrap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ jobPosition }) {
    const { data, setData, put, processing, errors } = useForm({
        name: jobPosition?.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('job_positions.update', jobPosition.id));
    };

    return (
        <Wrap header={`Editar Cargo: ${jobPosition.name}`}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm text-factor-dark font-semibold">
                        Nombre del Cargo
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-slate-200 focus:border-slate-400"
                    />
                    {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-6 py-2 rounded shadow transition"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </Wrap>
    );
}
