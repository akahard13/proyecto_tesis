import { Head, usePage, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Wrap from '@/Components/Wrap';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import ConfirmModal from '@/Components/ConfirmModal';
import { can } from '@/Utils/Permissions';

export default function Main({ client, data = [] }) {
    const permissions = usePage().props.auth.permissions;
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [action, setAction] = useState('Eliminar');
    const datalength = data.length;
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setAction('Eliminar');
        setModalTitle('¿Estás seguro de que quieres eliminar este pago?');
        setShowModal(true);
    };

    const handleConfirm = () => {
        destroy(route('payments_plans.destroy', { client: client.id, payment: selectedId }));
        setShowModal(false);
    };

    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <Wrap header="Historial de Pagos">
            <Head title="Pagos" />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                {can('payments_plans.store', permissions) && (
                    <a
                        href={route('payments_plans.create', client.id)}
                        className="bg-factor-yellow-500 hover:bg-factor-yellow-600 text-black font-semibold py-2 px-4 rounded shadow-sm transition"
                    >
                        Nuevo pago
                    </a>
                )}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-500 flex items-center justify-center text-white text-xl font-bold">
                            <span className="material-icons">{`${client.name.charAt(0)}${client.lastname.charAt(0)}`}</span>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-slate-800">{`${client.name} ${client.lastname}`}</p>
                            <p className="text-sm text-slate-500">{client.gender.name ?? 'Género N/D'}</p>
                            <p className="text-sm text-slate-500">Código: {client.code}</p>
                            <p className="text-sm text-slate-500">Celular: {client.cellphone}</p>
                            <p className="text-sm text-slate-500">Fecha de inscripción: {client.inscription_day}</p>
                            <p className="text-sm text-slate-500">Fecha de nacimiento: {client.birthday}</p>
                        </div>
                        {data.length > 0 && (
                            <div className="ml-auto bg-green-50 border border-green-200 rounded-md px-4 py-2 text-green-800 text-sm shadow-inner text-right">
                                <p className="font-semibold">Último Pago:</p>
                                <p>{data[data.length - 1].start_date}</p>
                                <p>{data[data.length - 1].plan}</p>
                                <p>{data[data.length - 1].frequency}</p>
                                <p>C$ {Number(data[data.length - 1].amount).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="bg-green-100 text-green-800 text-sm font-semibold py-2 px-4 mb-4 rounded">
                    {flash.success}
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-300 border border-slate-300 rounded-xl">
                    <thead className="bg-factor-primary">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Plan</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Frecuencia</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Inicio</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Fin</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Actual</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Monto</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-600">Sin pagos registrados</td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-100 text-slate-700">
                                    <td className="px-6 py-4 text-sm">{item.plan}</td>
                                    <td className="px-6 py-4 text-sm">{item.frequency}</td>
                                    <td className="px-6 py-4 text-sm">{item.start_date}</td>
                                    <td className="px-6 py-4 text-sm">{item.end_date}</td>
                                    <td className='px-6 py-4 text-sm'>{item.active?'Sí':'No'}</td>
                                    <td className="px-6 py-4 text-sm">C$ {Number(item.amount).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm flex gap-2">
                                        {/* {can('payments_plans.update', permissions) && (
                                            <a
                                                href={route('payments_plans.edit', { client: client.id, payment: item.id })}
                                                className="text-factor-primary"
                                            >
                                                <MdOutlineEdit className="w-6 h-6" title="Editar" />
                                            </a>
                                        )} */}
                                        {can('payments_plans.delete', permissions) && (
                                            <button
                                                onClick={() => handleDeleteClick(item.id)}
                                                className="text-factor-primary hover:text-red-800"
                                            >
                                                <FaRegTrashAlt className="w-6 h-6" title="Eliminar" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
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
