import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { can } from '@/Utils/Permissions';
import Wrap from '@/Components/Wrap';
export default function PermissionsList({ roles, permission_list }) {
    const permissions = usePage().props.auth.permissions;
    const initialPermissions = {};

    permission_list.forEach((page) => {
        page.permissions.forEach((perm) => {
            const key = `page_${page.page_id}_permission_${perm.permission_id}`;
            initialPermissions[key] = perm.checked || false;
        });
    });

    const form = useForm({
        rol_id: roles.id,
        permissions: initialPermissions,
    });
    function togglePermission(key) {
        form.setData(`permissions.${key}`, !form.data.permissions[key]);
    }
    function submit(e) {
        e.preventDefault();
        const checkedPermissions = [];

        Object.entries(form.data.permissions).forEach(([key, value]) => {
            const [, pageId, , permissionId] = key.split('_');

            checkedPermissions.push({
                page_id: Number(pageId),
                permission_id: Number(permissionId),
                rol_id: form.data.rol_id,
                checked: value
            });

        });
        form.post(route('permissions.store', { data: checkedPermissions }));
    }

    return (
        <Wrap header={`Permisos: ${roles.name}`}>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {permission_list.map((page) => {
                        return (
                            <div key={page.page_id} className="border rounded p-4 bg-gray-50">
                                <h3 className="text-lg font-bold mb-2">{page.page_name}</h3>
                                <ul className="space-y-2">
                                    {page.permissions.map((perm) => {
                                        const key = `page_${page.page_id}_permission_${perm.permission_id}`;
                                        return (
                                            <li key={perm.permission_id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={key}
                                                    checked={form.data.permissions[key]}
                                                    onChange={() => togglePermission(key)}
                                                    className={`form-checkbox ${page.page_id === 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={page.page_id === 2}
                                                />
                                                <label htmlFor={key}>{perm.permission_name}</label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {can('permissions.store', permissions) && (
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                    >
                        Guardar permisos
                    </button>
                )}
            </form>
        </Wrap>
    );
}
