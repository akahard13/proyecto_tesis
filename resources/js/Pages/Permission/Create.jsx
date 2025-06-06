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
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Crear Permiso</h2>}>
            <Head title="Nuevo Permiso" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg space-y-6">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="flex-1 border rounded px-4 py-2"
                                placeholder="Ingrese el nombre del permiso"
                                required
                            />
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700"
                            >
                                Guardar
                            </button>
                        </form>

                        {roles?.name && (
                            <div className="mt-4 text-green-600">
                                Rol actual creado: <strong>{roles.name}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
