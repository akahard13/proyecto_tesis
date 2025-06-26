import InputLabel from "@/Components/InputLabel";
import Wrap from "@/Components/Wrap";
import { useState } from "react";

export default function Home({ calendario, months, years, current_year, current_month }) {
    const [calendar, setCalendar] = useState(calendario);
    const [selectedMonth, setSelectedMonth] = useState(current_month);
    const [selectedYear, setSelectedYear] = useState(current_year);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        // Actualizar el estado correspondiente
        if (name === 'month') {
            setSelectedMonth(value);
        } else if (name === 'year') {
            setSelectedYear(value);
        }

        try {
            const response = await fetch(`/home/calendar/${selectedYear}/${selectedMonth}`);

            if (!response.ok) {
                throw new Error('Error al obtener el calendario');
            }

            const text = await response.text(); // Primero obtener como texto
            const data = text ? JSON.parse(text) : {}; // Parsear solo si hay contenido
            console.log(text, data)
            if (!data.calendario) {
                throw new Error('Formato de respuesta inválido');
            }

            setCalendar(data.calendario);
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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