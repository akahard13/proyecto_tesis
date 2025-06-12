import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Wrap({ children, header }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Permisos
                </h2>
            }
        >
            <Head title={header} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-factor-secundary p-6 shadow rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}