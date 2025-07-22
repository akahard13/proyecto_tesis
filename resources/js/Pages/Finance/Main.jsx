import { Head, useForm, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect, useState } from 'react';
import Wrap from '@/Components/Wrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import ConfirmModal from '@/Components/ConfirmModal';

export default function Main({ ingreso = false, title = 'Crear Ingreso' }) {
    const { delete: destroy } = useForm();
    const permissions = usePage().props.auth.permissions;
    const { flash, data } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [action, setAction] = useState('Eliminar');

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setAction('Eliminar');
        setModalTitle('¿Estás seguro de que quieres eliminar este ingreso?');
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (ingreso) {
            destroy(route('incomings.delete', selectedId));
        }else{
            destroy(route('outgoings.delete', selectedId));
        }

        setShowModal(false);
    };

    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <Wrap header="Ingresos">
            <Head title="Ingresos" />

            {can('incomings.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route(ingreso ? 'incomings.create' : 'outgoings.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                    >
                        {title}
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
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Categoría</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Descripción</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Monto</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Fecha</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                <td className="px-6 py-4 text-sm">{item.category}</td>
                                <td className="px-6 py-4 text-sm">{item.description}</td>
                                <td className="px-6 py-4 text-sm">C$ {item.amount}</td>
                                <td className="px-6 py-4 text-sm">{item.registered_at}</td>
                                <td className="px-6 py-4 text-sm flex items-center justify-between gap-2">
                                    {can('incomings.update', permissions) && (
                                        <a
                                            href={ingreso ? route('incomings.edit', item.id) : route('outgoings.edit', item.id)}
                                            className="text-factor-primary"
                                        >
                                            <MdOutlineEdit className='w-8 h-8' title='Editar' />
                                        </a>
                                    )}
                                    {can('incomings.delete', permissions) && (
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="text-factor-primary hover:text-red-700 font-bold py-1 px-2 rounded"
                                        >
                                            <FaRegTrashAlt className='w-8 h-8' title='Eliminar' />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                show={showModal}
                title={modalTitle}
                action={action}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
            />
        </Wrap>
    );
}