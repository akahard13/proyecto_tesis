import Wrap from '@/Components/Wrap';
import { can } from '@/Utils/Permissions';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmModal from '@/Components/ConfirmModal';

export default function CategoriesMain({ categories }) {
    const permissions = usePage().props.auth.permissions;
    const showActions = can('categories.update', permissions) || can('categories.delete', permissions);
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showError, setShowError] = useState(!!flash.error);
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    const openDeleteModal = (category) => {
        setCategoryToDelete(category.id);
        setModalTitle(`¿Eliminar categoría "${category.name}"?`);
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (categoryToDelete) {
            router.delete(route('categories.destroy', categoryToDelete), {
                onSuccess: () => {
                    setShowModal(false);
                    setCategoryToDelete(null);
                }
            });
        }
    };

    return (
        <Wrap header="Categorías">
            {can('categories.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route('categories.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-2 px-4 rounded shadow-md transition duration-150 ease-in-out"
                    >
                        Crear Nueva Categoría
                    </a>
                </div>
            )}
            {showSuccess && (
                <div className="bg-green-100 text-green-800 text-sm font-semibold py-2 px-4 mb-4 rounded">
                    {flash.success}
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-500">
                    <thead className="bg-factor-primary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Nº</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Ingresos</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Egresos</th>
                            {showActions && (
                                <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                <td className="px-6 py-4 text-sm">{category.id}</td>
                                <td className="px-6 py-4 text-sm">{category.name}</td>
                                <td className="px-6 py-4 text-sm">{category.incoming ? 'Sí' : 'No'}</td>
                                <td className="px-6 py-4 text-sm">{category.outcoming ? 'Sí' : 'No'}</td>
                                {showActions && (
                                    <td className="px-6 py-4 text-sm flex items-center gap-4">
                                        {can('categories.update', permissions) && (
                                            <a
                                                href={route('categories.edit', category.id)}
                                                className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-1.5 rounded transition"
                                            >
                                                Editar
                                            </a>
                                        )}
                                        {can('categories.delete', permissions) && (
                                            <button
                                                onClick={() => openDeleteModal(category)}
                                                className="bg-red-500 text-white px-4 py-1.5 rounded font-semibold hover:bg-red-700 transition"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                show={showModal}
                title={modalTitle}
                action={'Eliminar'}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
            />
        </Wrap>
    );
}