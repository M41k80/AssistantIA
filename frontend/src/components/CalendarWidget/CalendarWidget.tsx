"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es as esLocale } from "date-fns/locale";
import { sampleTasks } from "@/lib/sampleTask"; 

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

export default function CalendarWidget() {

    const tasks = sampleTasks;

    const events = tasks.map((task: { titulo: string; prioridad: string; inicio: string; fin: string }) => ({
        title: `${task.titulo} (${task.prioridad})`,
        start: new Date(task.inicio),
        end: new Date(task.fin),
        allDay: false, 
    }));

    return (
        <div className="h-[400px] bg-white rounded-xl overflow-hidden shadow-sm">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture="es"
                messages={{
                    today: "Hoy",
                    previous: "Anterior",
                    next: "Siguiente",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                }}
                style={{ height: "100%", padding: "1rem" }}
            />
        </div>
    );
}
