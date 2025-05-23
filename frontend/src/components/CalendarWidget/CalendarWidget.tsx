"use client"; 

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {format } from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es as esLocale } from 'date-fns/locale';


const locales = {
    es: esLocale,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const events = [
    {
        title: 'Campaña Marketing',
        allDay: true,
        start: new Date(2025, 4, 23),
        end: new Date(2025, 4, 23),
    },
    {
        title: 'Lanzamiento Producto',
        start: new Date(2025, 4, 24, 10, 30),
        end: new Date(2025, 4, 24, 12, 30),
    },
];

export default function CalendarWidget() {
    return (
        <div className="h-[400px] bg-white rounded-xl overflow-hidden shadow-sm">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture="es"
                messages={{
                    today: 'Hoy',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                }}
                style={{ height: '100%', padding: '1rem' }}
            />
        </div>
    );
}