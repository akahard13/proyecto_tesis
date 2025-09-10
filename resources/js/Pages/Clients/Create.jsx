import { Head, usePage, useForm } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import Wrap from '@/Components/Wrap';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function create({ genders, inscription_date, code, client }) {
    const { data, setData, post, processing, errors, reset } =
        useForm({
            image: null,
            name: '',
            lastname: '',
            birthday: '',
            gender_id: '',
            code: code ?? '',
            inscription_day: inscription_date ?? '',
            cellphone: '',
        });
    const permissions = usePage().props.auth.permissions;
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('clients.store'), {
            onSuccess: () => reset(),
        });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const [preview, setPreview] = useState(null);
    return (
        <Wrap header="Nuevos Clientes">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row gap-8 p-6 ">
                    <div className="flex flex-col items-center md:items-start md:justify-start md:pr-8">
                        <label className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer group border-2 border-gray-200 shadow-md">
                            <img
                                src={preview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                                alt="Vista previa de perfil"
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-white font-semibold text-sm text-center">Subir foto</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-xs text-gray-500 mt-3 text-center max-w-xs">Formatos permitidos: JPG, PNG, GIF. Tamaño máximo: 5MB</p>
                    </div>
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                placeholder="Ingrese su nombre"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                Apellido <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Ingrese el correo"
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="gender" value="Género" />

                        <select
                            id="gender"
                            name="gender"
                            value={data.gender_id}
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            onChange={(e) => setData('gender_id', e.target.value)}
                            required
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.gender_id} className="mt-2" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="cellphone" value="Celular:" className="text-factor-dark font-semibold" />
                        <input
                            type="text"
                            name='cellphone'
                            value={data.cellphone}
                            onChange={(e) => setData('cellphone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Ingrese el nombre"
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
                            value={data.code ? data.code : 0}
                            onChange={(e) => setData('code', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            disabled
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="inscription_day" value="Fecha de registro" className="text-factor-dark font-semibold" />
                        <input
                            type="date"
                            name='inscription_day'
                            value={data.inscription_day}
                            onChange={(e) => setData('inscription_date', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Ingrese el correo"
                            required
                            disabled
                        />
                    </div>
                </div>
                {
                    can('clients.store', permissions) && (
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                        >
                            Guardar
                        </button>
                    )
                }
            </form>


        </Wrap>
    );
}