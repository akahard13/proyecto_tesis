import { useForm } from "@inertiajs/react";
import Wrap from "@/Components/Wrap";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Form({ plan = null, frequencies }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: plan?.name || '',
        mensual: plan?.mensual || '',
        quincenal: plan?.quincenal || '',
        semanal: plan?.semanal || '',
        diario: plan?.diario || ''
    });

    const submit = (e) => {
        e.preventDefault();
        plan
            ? put(route('plans.update', plan.id))
            : post(route('plans.store'));
    };

    return (
        <Wrap header={plan ? "Editar Plan" : "Nuevo Plan"}>
            <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>

                {frequencies.map((frec) => (
                    <div key={frec.id}>
                        <InputLabel htmlFor={frec.name} value={`Precio ${frec.name}`} />
                        <input
                            id={frec.name}
                            name={frec.name}
                            type="number"
                            value={data[frec.name]}
                            onChange={(e) => setData(frec.name, e.target.value)}
                            className="w-full border px-4 py-2 rounded"
                            min="0"
                        />
                        <InputError message={errors[frec.name]} className="mt-2" />
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-factor-yellow-500 hover:bg-factor-yellow-700 text-black font-semibold px-4 py-2 rounded"
                >
                    {plan ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </Wrap>
    );
}
