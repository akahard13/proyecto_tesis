import { Head, useForm, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect, useState } from 'react';
import Wrap from '@/Components/Wrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import ConfirmModal from '@/Components/ConfirmModal';
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function Employees() {
    const { delete: destroy } = useForm();
    const permissions = usePage().props.auth.permissions;
    const { flash, employees } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [action, setAction] = useState('Eliminar');

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setAction('Eliminar');
        setModalTitle('¿Estás seguro de que quieres eliminar este empleado?');
        setShowModal(true);
    };

    const handleConfirm = () => {
        destroy(route('employees.delete', selectedId));
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
        <Wrap header="Empleados">
            {can('employees.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route('employees.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                    >
                        Crear Nuevo Empleado
                    </a>
                </div>
            )}
            {showSuccess && (
                <div className="bg-green-100 text-green-800 text-sm font-semibold py-2 px-4 mb-4 rounded">
                    {flash.success}
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-500 overflow-scroll">
                    <thead className="bg-factor-primary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Nombre</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Apellidos</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Fecha de nacimiento</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Género</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Celular</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Puesto</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                <td className="px-6 py-4 text-sm">{emp.id}</td>
                                <td className="px-6 py-4 text-sm">{emp.name}</td>
                                <td className="px-6 py-4 text-sm">{emp.lastname}</td>
                                <td className="px-6 py-4 text-sm">{emp.birthday}</td>
                                <td className="px-6 py-4 text-sm">{emp.gender_name}</td>
                                <td className="px-6 py-4 text-sm">{emp.cellphone}</td>
                                <td className="px-6 py-4 text-sm">{emp.job_position_name || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-factor-dark flex items-center justify-between gap-2">
                                    {can('employees.update', permissions) && (
                                        <a
                                            href={route('employees.edit', emp.id)}
                                            className="text-factor-primary"
                                        >
                                            <MdOutlineEdit className='w-8 h-8' title='Editar' />
                                        </a>
                                    )}
                                    {can('payments_employees.view', permissions) && (
                                        <a
                                            href={route('payments_employees', emp.id)}
                                            className="text-factor-primary"
                                        >
                                            <RiMoneyDollarCircleLine className='w-8 h-8' title='Pagar' />
                                        </a>
                                    )}
                                    {can('employees.delete', permissions) && (
                                        <button
                                            onClick={() => handleDeleteClick(emp.id)}
                                            className="text-factor-primary hover:text-red-700 font-bold py-1 px-2 rounded mr-2"
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