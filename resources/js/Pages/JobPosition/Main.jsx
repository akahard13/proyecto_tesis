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
                    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                        {can('job_positions.store', permissions) && (
                            <div className="flex items-center justify-between mb-6">
                                <a
                                    href={route('job_positions.create')}
                                    className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                                >
                                    Crear Nuevo Cargo
                                </a>
                            </div>
                        )}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Nombre</th>
                                    {showActions &&
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                                    }

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {jobPositions.map((position) => (
                                    <tr key={position.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-800">{position.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{position.name}</td>
                                        {showActions &&
                                            <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-4">
                                                {can('job_positions.update', permissions) && (
                                                    <a
                                                        href={route('job_positions.edit', position.id)}
                                                        className="bg-slate-500 text-white px-4 py-1.5 rounded hover:bg-slate-700 transition"
                                                    >
                                                        Editar
                                                    </a>
                                                )}
                                                {can('job_positions.delete', permissions) && (
                                                    <a
                                                        href={route('job_positions.edit', position.id)}
                                                        className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-700 transition"
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
