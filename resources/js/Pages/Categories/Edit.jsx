import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Wrap from '@/Components/Wrap';
import { can } from '@/Utils/Permissions';
import { useForm, usePage } from '@inertiajs/react';

export default function EditCategory({ categories }) {
    const permissions = usePage().props.auth.permissions;
    const { data, setData, put, processing, errors } = useForm({
        name: categories?.name || '',
        incoming: categories?.incoming || false,
        outcoming: categories?.outcoming || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('categories.update', categories.id));
    };

    return (
        <Wrap header={`Editar Categoría: ${categories.name}`}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" className="text-factor-dark font-semibold" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`w-full border rounded px-4 py-2 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ingrese el nombre de la categoría"
                        required
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>
                <div className="flex space-x-8">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="incoming"
                            name="incoming"
                            checked={data.incoming}
                            onChange={(e) => setData('incoming', e.target.checked)}
                            className="form-checkbox border-gray-300 text-factor-primary"
                        />
                        <span className="text-gray-700 font-medium">Ingresos</span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="outcoming"
                            name="outcoming"
                            checked={data.outcoming}
                            onChange={(e) => setData('outcoming', e.target.checked)}
                            className="form-checkbox border-gray-300 text-factor-primary"
                        />
                        <span className="text-gray-700 font-medium">Egresos</span>
                    </label>
                </div>

                {can('categories.update', permissions) && (
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-6 py-2 rounded shadow"
                    >
                        Guardar Cambios
                    </button>
                )}
            </form>
        </Wrap>
    );
}
