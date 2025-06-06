import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect } from 'react';

export default function Permissions({ roles, permissions_list }) {
    const permissions = usePage().props.auth.permissions;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Permisos
                </h2>
            }
        >
            <Head title="Permisos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow rounded-lg">
                        {can('permissions.store', permissions) && (
                            <div className="flex items-center justify-between mb-6">
                                <a
                                    href={route('permissions.create')}
                                    className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                                >
                                    Crear Nuevo Permiso
                                </a>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tabla de Roles */}
                            <div className="overflow-auto rounded-lg shadow">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Roles</th>
                                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {roles && roles.map((role) => (
                                            <tr key={role.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-800">{role.name}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <a
                                                        href={route('permissions.edit', role.id)}
                                                        className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                                                    >
                                                        Editar
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Tabla de Permisos */}
                            <div className="overflow-auto rounded-lg shadow">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Permisos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {permissions_list && permissions_list.map((perm) => (
                                            <tr key={perm.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-800">{perm.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
