import { Head, usePage, useForm } from '@inertiajs/react';
import { can } from '@/Utils/Permissions';
import Wrap from '@/Components/Wrap';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function create({ genders, inscription_date, code, client }) {
    const { data, setData, post, processing, errors, reset } =
        useForm({
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
    return (
        <Wrap header="Nuevos Clientes">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="name" value="Nombre" className="text-factor-dark font-semibold" />
                        <input
                            type="text"
                            name='name'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="border rounded px-4 py-2"
                            placeholder="Ingrese el nombre"
                            required
                        />

                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="lastname" value="Apellido" className="text-factor-dark font-semibold" />
                        <input
                            type="text"
                            name='lastname'
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            className="border rounded px-4 py-2"
                            placeholder="Ingrese el apellido"
                            required
                        />
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
                            className="border rounded px-4 py-2"
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
                            className="mt-1 block w-full rounded-lg"
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
                            className="border rounded px-4 py-2"
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
                            className="border rounded px-4 py-2"
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
                            className="border rounded px-4 py-2"
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