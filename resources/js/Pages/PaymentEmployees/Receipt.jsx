import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import { router } from '@inertiajs/react';

export default function Receipt({ payment }) {
    const { employee } = payment;
    const printRef = useRef();
    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <>
            <Head title="Recibo de Pago" />

            <div ref={printRef} className="max-w-3xl mx-auto p-6 text-sm font-sans text-slate-700  border-slate-300 rounded-lg mt-10 bg-slate-100">
                <div className="text-center mb-6">
                    <img src="/logo.png" alt="Logo" className="mx-auto h-16 mb-2" />
                    <h1 className="text-2xl font-bold text-slate-700">Recibo de Pago</h1>
                    <p className="text-slate-500">Fecha: {payment.payment_date}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div>
                        <p className="mb-2">
                            <span className="font-semibold text-slate-600">Empleado:</span> {employee.name} {employee.lastname}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold text-slate-600">Cargo:</span> {employee?.job_position?.name ?? 'N/D'}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold text-slate-600">Género:</span> {employee.gender?.name ?? 'N/D'}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2">
                            <span className="font-semibold text-slate-600">Celular:</span> {employee.cellphone ?? 'N/D'}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold text-slate-600">Fecha de Contratación:</span> {employee?.hiring_day ?? 'N/D'}
                        </p>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 mb-6">
                    <p className="mb-2">
                        <span className="font-semibold text-slate-600">Monto:</span> C$ {Number(payment.amount).toLocaleString()}
                    </p>
                    <p className="mb-2">
                        <span className="font-semibold text-slate-600">Descripción:</span> {payment.description}
                    </p>
                </div>
                <div className="flex justify-between mt-10 mb-6">
                    <div className="text-center">
                        <div className="border-t border-slate-400 w-48 mx-auto mb-1"></div>
                        <p className="text-slate-600 text-xs">Firma del Empleado</p>
                    </div>
                    <div className="text-center">
                        <div className="border-t border-slate-400 w-48 mx-auto mb-1"></div>
                        <p className="text-slate-600 text-xs">Autorizado por</p>
                    </div>
                </div>
                <div className="mt-6 text-center text-xs text-slate-400">
                    <p>Este documento fue generado electrónicamente</p>
                </div>
            </div>
            <div className="print:hidden max-w-4xl mx-auto p-4 flex justify-center items-center space-x-4">
                <button
                    onClick={handlePrint}
                    className="bg-factor-yellow-500 hover:bg-factor-yellow-600 text-black font-semibold py-2 px-4 rounded shadow-sm transition"
                >
                    Imprimir Recibo
                </button>
                <button
                    type="button"
                    onClick={() => router.visit(`/payments_employees/${employee.id}`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow-sm transition"
                >
                    Regresar
                </button>
            </div>
        </>
    );
}
