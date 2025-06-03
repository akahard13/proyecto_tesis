import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect } from 'react';

export default function Dashboard({ roles, permissions_list }) {
    const permissions = usePage().props.auth.permissions;
    console.log(permissions);
    // useEffect(() => {
    //     if (!can('dashboard.view', permissions)) {
    //         window.location.href = '/restricted';
    //     }
    // }, []);

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            {/* Tabla 1 */}
                            <div className="w-full sm:w-1/2">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Roles</th>
                                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles && roles.map((role) => (
                                            <tr key={role.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{role.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <a href={`/permissions/${role.id}`} className="text-blue-600 hover:underline">Editar</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Tabla 2 */}
                            <div className="w-full sm:w-1/2 mt-2 sm:mt-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Permisos</th>
                                            {/* <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Acción</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions_list && permissions_list.map((perm) => (
                                            <tr key={perm.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{perm.name}</td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <a href={`/permissions/${perm.id}`} className="text-blue-600 hover:underline">Ver</a>
                                                </td> */}
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
