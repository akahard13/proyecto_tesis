import { Head, useForm, usePage } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import { useEffect, useState } from 'react';
import Wrap from '@/Components/Wrap';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import ConfirmModal from '@/Components/ConfirmModal';
export default function clients({ clients }) {
    const { delete: destroy } = useForm();
    const permissions = usePage().props.auth.permissions;
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };
    const handleConfirm = () => {
        destroy (route('clients.delete', selectedId));
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
        <Wrap header="Clientes">
            {can('clients.store', permissions) && (
                <div className="flex items-center justify-between mb-6">
                    <a
                        href={route('clients.create')}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold py-1.5 px-4 rounded shadow-sm transition duration-150 ease-in-out"
                    >
                        Crear Nuevo Cliente
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
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Código</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Fecha de registro</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Celular</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {clients.map((cli) => (
                            <tr key={cli.id} className="hover:bg-slate-400 text-factor-dark hover:text-white">
                                <td className="px-6 py-4 text-sm">{cli.id}</td>
                                <td className="px-6 py-4 text-sm">{cli.name}</td>
                                <td className="px-6 py-4 text-sm">{cli.lastname}</td>
                                <td className="px-6 py-4 text-sm">{cli.birthday}</td>
                                <td className="px-6 py-4 text-sm">{cli.gender}</td>
                                <td className="px-6 py-4 text-sm">{cli.code}</td>
                                <td className="px-6 py-4 text-sm">{cli.inscription_day}</td>
                                <td className="px-6 py-4 text-sm">{cli.cellphone}</td>

                                <td className="px-6 py-4 text-sm text-factor-dark flex items-center justify-between gap-2">
                                    {can('clients.update', permissions) && (
                                        <a
                                            href={route('clients.edit', cli.id)}
                                            className="text-factor-primary"
                                        >
                                            <MdOutlineEdit className='w-8 h-8' title='Editar' />
                                        </a>
                                    )}
                                    {can('clients.delete', permissions) && (
                                        <button
                                            onClick={() => handleDeleteClick(cli.id)}
                                            className="text-factor-primary hover:text-red-700 font-bold py-1 px-2 rounded mr-2"
                                        >
                                            <FaRegTrashAlt className='w-8 h-8' title='Eliminar' />
                                        </button>
                                    )}
                                    {can('clients.delete', permissions) && (
                                        <a
                                            href={route('clients.edit', cli.id)}
                                            className="text-factor-primary"
                                        >
                                            <RiMoneyDollarCircleLine className='w-8 h-8' title='Pagar' />
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                show={showModal}
                title="¿Estás seguro de que quieres eliminar este cliente?"
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
            />
        </Wrap>
    );
}