import InputLabel from '@/Components/InputLabel';
import Wrap from '@/Components/Wrap';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/Utils/Permissions';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function CreateJobPosition() {
    const form = useForm({ name: '' });
    const permissions = usePage().props.auth.permissions;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('job_positions.store'), {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Wrap header="Nuevos Cargos">
            <InputLabel htmlFor="name" value="Nombre" className='text-factor-dark font-semibold' />
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Ingrese el nombre del cargo"
                    required
                />
                {
                    can('job_positions.store', permissions) && (
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                        >
                            Guardar
                        </button>
                    )
                }
            </form>
        </Wrap>
    );
}
