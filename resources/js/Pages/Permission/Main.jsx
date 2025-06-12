import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect } from 'react';
import Wrap from '@/Components/Wrap';

export default function Permissions({ roles, permissions_list }) {
    const permissions = usePage().props.auth.permissions;

    return (
        <Wrap header="Permisos" >
            {can('permissions.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route('permissions.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                    >
                        Crear Nuevo Permiso
                    </a>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tabla de Roles */}
                <div className="overflow-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-factor-primary">
                            <tr>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-white">Roles</th>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-white">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {roles && roles.map((role) => (
                                <tr key={role.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                    <td className="px-6 py-4 text-sm">{role.name}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <a
                                            href={route('permissions.edit', role.id)}
                                            className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
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
                        <thead className="bg-factor-primary">
                            <tr>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-white">Permisos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {permissions_list && permissions_list.map((perm) => (
                                <tr key={perm.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                    <td className="px-6 py-4 text-sm ">{perm.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrap>
    );
}
