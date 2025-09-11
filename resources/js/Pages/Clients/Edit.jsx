import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Wrap from '@/Components/Wrap';
import { can } from '@/Utils/Permissions';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ client, genders }) {
    const permissions = usePage().props.auth.permissions;

    const { data, setData, post, processing, errors } = useForm({
        new_image: null, // campo para la nueva imagen
        name: client?.name || '',
        lastname: client?.lastname || '',
        birthday: client?.birthday || '',
        inscription_day: client?.inscription_day || '',
        gender_id: client?.gender_id || '',
        code: client?.code || '',
        cellphone: client?.cellphone || '',
    });

    const [preview, setPreview] = useState(client?.image || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('new_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('clients.update', client.id), {
            onSuccess: () => console.log('Cliente actualizado'),
        });
    };

    return (
        <Wrap header={`Editar Cliente: ${client.name}`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row gap-8 p-6">
                    <div className="flex flex-col items-center md:items-start md:pr-8">
                        <label className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group border-2 border-gray-200 shadow-md">
                            <img
                                src={preview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                                alt="Vista previa de perfil"
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-semibold text-sm text-center">Subir foto</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-xs text-gray-500 mt-3 text-center max-w-xs">
                            Formatros permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB
                        </p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Nombre" className="text-factor-dark font-semibold" />
                            <input
                                type="text"
                                name='name'
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ingrese su nombre"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="lastname" value="Apellido" className="text-factor-dark font-semibold" />
                            <input
                                type="text"
                                name='lastname'
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ingrese su apellido"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="birthday" value="Fecha de nacimiento" className="text-factor-dark font-semibold" />
                        <input
                            type="date"
                            name='birthday'
                            value={data.birthday}
                            onChange={(e) => setData('birthday', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="gender" value="Género" />
                        <select
                            id="gender"
                            name="gender_id"
                            value={data.gender_id}
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setData('gender_id', e.target.value)}
                            required
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map((g) => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.gender_id} className="mt-2" />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="cellphone" value="Celular" className="text-factor-dark font-semibold" />
                        <input
                            type="text"
                            name='cellphone'
                            value={data.cellphone}
                            onChange={(e) => setData('cellphone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="code" value="Código" className="text-factor-dark font-semibold" />
                        <input
                            type="text"
                            name='code'
                            value={data.code}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="inscription_day" value="Fecha de registro" className="text-factor-dark font-semibold" />
                        <input
                            type="date"
                            name='inscription_day'
                            value={data.inscription_day}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            disabled
                        />
                    </div>
                </div>

                {can('clients.update', permissions) && (
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-factor-yellow-500 mt-4 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                )}
            </form>
        </Wrap>
    );
}
