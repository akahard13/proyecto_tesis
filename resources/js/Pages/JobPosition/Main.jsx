import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { can } from '@/Utils/Permissions';
import { Head, usePage } from '@inertiajs/react';

export default function JobPositions({ jobPositions }) {
    const permissions = usePage().props.auth.permissions;
    const showActions = can('job_positions.update', permissions) || can('job_positions.delete', permissions);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Puestos de Trabajo</h2>}>
            <Head title="Puestos de Trabajo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-factor-secundary overflow-hidden shadow rounded-lg p-6">
                        {can('job_positions.store', permissions) && (
                            <div className="flex items-center justify-between mb-6">
                                <a
                                    href={route('job_positions.create')}
                                    className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-2 px-4 rounded shadow-md transition duration-150 ease-in-out"
                                >
                                    Crear Nuevo Cargo
                                </a>
                            </div>
                        )}
                        <table className="min-w-full divide-y divide-slate-500">
                            <thead className="bg-factor-primary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-white">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-white">Nombre</th>
                                    {showActions &&
                                        <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                                    }

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {jobPositions.map((position) => (
                                    <tr key={position.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                        <td className="px-6 py-4 text-sm">{position.id}</td>
                                        <td className="px-6 py-4 text-sm">{position.name}</td>
                                        {showActions &&
                                            <td className="px-6 py-4 text-sm text-factor-dark flex items-center gap-4">
                                                {can('job_positions.update', permissions) && (
                                                    <a
                                                        href={route('job_positions.edit', position.id)}
                                                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-1.5 rounded transition"
                                                    >
                                                        Editar
                                                    </a>
                                                )}
                                                {can('job_positions.delete', permissions) && (
                                                    <a
                                                        href={route('job_positions.edit', position.id)}
                                                        className="bg-red-500 text-white px-4 py-1.5 rounded font-semibold hover:bg-red-700 transition"
                                                    >
                                                        Eliminar
                                                    </a>
                                                )}
                                            </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
