import InputLabel from '@/Components/InputLabel';
import Wrap from '@/Components/Wrap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateRole({ roles }) {
    const form = useForm({ name: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('permissions.store_permission'), {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Wrap header="Nuevo Permiso">
            <InputLabel htmlFor="name" value="Nombre" className='text-factor-dark font-semibold' />
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    id="name"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Ingrese el nombre del permiso"
                    required
                />
                <button
                    type="submit"
                    disabled={form.processing}
                    className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                >
                    Guardar
                </button>
            </form>

            {roles?.name && (
                <div className="mt-4 text-green-600">
                    Rol actual creado: <strong>{roles.name}</strong>
                </div>
            )}
        </Wrap>
    );
}
