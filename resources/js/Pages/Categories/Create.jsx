import InputLabel from '@/Components/InputLabel';
import Wrap from '@/Components/Wrap';
import { can } from '@/Utils/Permissions';
import { useForm, usePage } from '@inertiajs/react';

export default function CreateCategory() {
    const permissions = usePage().props.auth.permissions;

    const form = useForm({
        name: '',
        incoming: false,
        outcoming: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('categories.store'), {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Wrap header="Nueva Categoría">
            <div className="w-full flex justify-center py-6 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col sm:flex-row sm:items-center gap-4 w-full max-w-[900px]"
                >
                    <div className="flex-1">
                        <InputLabel htmlFor="name" value="Nombre" className="text-sm text-gray-700 mb-1" />
                        <input
                            type="text"
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className={`w-full border px-3 py-2 rounded text-sm ${
                                form.errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ingrese el nombre de la categoría"
                            required
                        />
                        {form.errors.name && (
                            <p className="text-red-500 text-xs mt-1">{form.errors.name}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label className="flex items-center text-sm gap-2">
                            <input
                                type="checkbox"
                                id="incoming"
                                checked={form.data.incoming}
                                onChange={(e) => form.setData('incoming', e.target.checked)}
                                className="form-checkbox border-gray-300 text-factor-primary"
                            />
                            Ingresos
                        </label>

                        <label className="flex items-center text-sm gap-2">
                            <input
                                type="checkbox"
                                id="outcoming"
                                checked={form.data.outcoming}
                                onChange={(e) => form.setData('outcoming', e.target.checked)}
                                className="form-checkbox border-gray-300 text-factor-primary"
                            />
                            Egresos
                        </label>
                    </div>

                    {can('categories.store', permissions) && (
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center gap-2 bg-factor-yellow-500 hover:bg-factor-yellow-600 text-black text-sm font-medium px-6 py-2 rounded-md shadow disabled:opacity-50"
                        >
                            Guardar
                        </button>
                    )}
                </form>
            </div>
        </Wrap>
    );
}
