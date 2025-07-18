import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Wrap from '@/Components/Wrap';
import { useForm, usePage } from "@inertiajs/react";
import { can } from "@/Utils/Permissions";
import ConfirmModal from "@/Components/ConfirmModal";
import { useEffect, useState } from "react";

export default function Plans({ plans }) {
    const permissions = usePage().props.auth.permissions;
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalTitle, setModalTitle] = useState('¿Estas seguro de que quieres eliminar este plan?');
    const [modalAction, setModalAction] = useState('delete');
    const [action, setAction] = useState('Eliminar');
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setModalAction('delete');
        setAction('Eliminar');
        setModalTitle('¿Estás seguro de que quieres eliminar este cliente?');
        setShowModal(true);
    };
    const handleConfirm = () => {
        if (modalAction === 'delete') {
            destroy(route('plans.delete', selectedId));
        }
        setShowModal(false);
    };
    useEffect(() => {
        if (flash.success) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash.success]);
    return (
        <Wrap header="Planes">
            {can('clients.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route('plans.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                    >
                        Crear Nuevo Plan
                    </a>
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-500 overflow-scroll">
                    <thead className="bg-factor-primary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Mensual</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Quincenal</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Semanal</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Diario</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {plans.map((plan, index) => (
                            <tr key={index} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                <td className="px-6 py-4 text-sm">{plan.name}</td>
                                <td className="px-6 py-4 text-sm">{plan.mensual || '-'}</td>
                                <td className="px-6 py-4 text-sm">{plan.quincenal || '-'}</td>
                                <td className="px-6 py-4 text-sm">{plan.semanal || '-'}</td>
                                <td className="px-6 py-4 text-sm">{plan.diario || '-'}</td>
                                <td className="px-6 py-4 text-sm flex gap-2 items-center">
                                    <a
                                        href={route('plans.edit', plan.id)}
                                        className="text-factor-primary"
                                        title="Editar"
                                    >
                                        <MdOutlineEdit className="w-8 h-8" />
                                    </a>
                                    <button
                                        onClick={() => handleDeleteClick(plan.id)}
                                        className="text-factor-primary hover:text-red-800"
                                        title="Eliminar"
                                    >
                                        <FaRegTrashAlt className="w-8 h-8" />
                                    </button>
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
