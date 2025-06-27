import InputLabel from "@/Components/InputLabel";
import Wrap from "@/Components/Wrap";
import { useState } from "react";

export default function Home({ calendario, months, years, current_year, current_month }) {
    const [calendar, setCalendar] = useState(calendario);
    const [selectedMonth, setSelectedMonth] = useState(current_month);
    const [selectedYear, setSelectedYear] = useState(current_year);
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const newMonth = name === 'month' ? value : selectedMonth;
        const newYear = name === 'year' ? value : selectedYear;
        if (name === 'month') setSelectedMonth(value);
        if (name === 'year') setSelectedYear(value);
        try {
            const response = await fetch(`/home/calendar/${newYear}/${newMonth}`);
            if (!response.ok) {
                throw new Error('Error al obtener el calendario');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('Datos del calendario no recibidos');
            }
            setCalendar(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Wrap header="Inicio/Asistencia">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <InputLabel htmlFor="month" value="Mes" />
                    <select
                        id="month"
                        name="month"
                        className="mt-1 block w-full rounded-lg"
                        value={selectedMonth}
                        onChange={handleChange}
                        required
                    >
                        {months.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col flex-1">
                    <InputLabel htmlFor="year" value="Año" />
                    <select
                        id="year"
                        name="year"
                        className="mt-1 block w-full rounded-lg"
                        value={selectedYear}
                        onChange={handleChange}
                        required
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="py-12">
                <div className="mb-8 rounded-lg text-justify bg-slate-400 p-4 shadow-lg">
                    <h1 className="text-lg font-bold">Nota Importante:</h1>
                    <ol className="list-disc list-inside">
                        <li>Los días marcados en verde son los días en que usted registró asistencia.</li>
                        <li>Para marcar asistencias debe ingresar su código en la pantalla que se encuentra en la entrada del gimnasio.</li>
                    </ol>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-7 gap-2 text-center mb-2 font-bold md:hidden">
                        {diasSemana.map((dia) => (
                            <div key={dia} className="p-2 capitalize">
                                {dia.substring(0, 3)} {/* Muestra solo las primeras 3 letras */}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center p-4 bg-factor-secundary rounded shadow">
                        {calendar.map((dia) => {
                            const diaMes = dia.date.split('-')[2];

                            return (
                                <div
                                    key={dia.date}
                                    className={`p-2 rounded ${dia.attended ? 'bg-green-500 text-white' : 'bg-gray-300'
                                        } ${!dia.current_month ? 'opacity-50' : ''
                                        }`}
                                >
                                    <div className="font-bold">{diaMes}</div>
                                    <div className="text-xs hidden md:block">
                                        {dia.day.substring(0, 3)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Wrap>
    );
}