import { Head, useForm, usePage } from '@inertiajs/react';
import Wrap from '@/Components/Wrap';
import { can } from '@/Utils/Permissions';
import InputLabel from '@/Components/InputLabel';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        lastname: '',
        birthday: '',
        gender_id: '',
        cellphone: '',
        hiring_day: '',
        job_position_id: '',
    });

    const { genders, job_positions } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <Wrap header="Crear Empleado">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="name" value="Nombres" className="text-factor-dark font-semibold" />
                        <input
                            label="Nombre"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="lastname" value="Apellidos" className="text-factor-dark font-semibold" />
                        <input
                            label="Apellidos"
                            name="lastname"
                            id="lastname"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            error={errors.lastname}
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="birthday" value="Fecha de nacimiento" className="text-factor-dark font-semibold" />

                        <input
                            label="Fecha de nacimiento"
                            name="birthday"
                            id="birthday"
                            type="date"
                            value={data.birthday}
                            onChange={(e) => setData('birthday', e.target.value)}
                            error={errors.birthday}
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="hiring_day" value="Fecha de contratación" className="text-factor-dark font-semibold" />
                        <input
                            label="Fecha de contratación"
                            name="hiring_day"
                            id="hiring_day"
                            type="date"
                            value={data.hiring_day}
                            onChange={(e) => setData('hiring_day', e.target.value)}
                            error={errors.hiring_day}
                            required
                        />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="gender_id" value="Género" className="text-factor-dark font-semibold" />

                        <select
                            label="Género"
                            name="gender_id"
                            id='gender_id'
                            value={data.gender_id}
                            onChange={(e) => setData('gender_id', e.target.value)}
                            error={errors.gender_id}
                            required
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="cellphone" value="Celular" className="text-factor-dark font-semibold" />
                        <input
                            label="Celular"
                            name="cellphone"
                            id="cellphone"
                            type="tel"
                            value={data.cellphone}
                            onChange={(e) => setData('cellphone', e.target.value)}
                            error={errors.cellphone}
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <InputLabel htmlFor="job_position_id" value="Puesto de trabajo" className="text-factor-dark font-semibold" />
                        <select
                            label="Puesto de trabajo"
                            name="job_position_id"
                            id="job_position_id"
                            value={data.job_position_id}
                            onChange={(e) => setData('job_position_id', e.target.value)}
                            error={errors.job_position_id}
                            required
                        >
                            <option value="">Seleccione un puesto</option>
                            {job_positions.map((job) => (
                                <option key={job.id} value={job.id}>
                                    {job.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded">
                        {processing ? 'Creando...' : 'Crear Personal'}
                    </button>
                </div>
            </form>
        </Wrap>
    );
}