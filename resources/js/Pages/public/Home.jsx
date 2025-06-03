import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Home({calendario}) {
  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Asistencia
                </h2>
            }
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"></div>
        <div className="grid grid-cols-7 gap-2 text-center p-4 bg-white rounded shadow">
            {calendario.map((dia) => (
                <div
                    key={dia.date}
                    className={`p-2 rounded ${
                        dia.attended ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                >
                    <div className="font-bold">{new Date(dia.date).getDate()}</div>
                    <div className="text-xs">{dia.day}</div>
                </div>
            ))}
        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}