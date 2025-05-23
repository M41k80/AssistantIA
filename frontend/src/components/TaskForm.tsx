'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function TaskForm() {
    const [titulo, setTitulo] = useState('')
    const [urgencia, setUrgencia] = useState('')
    const [fechaLimite, setFechaLimite] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [habitos, setHabitos] = useState('')
    const [duracionMinutos, setDuracionMinutos] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const task = {
            titulo,
            urgencia: parseInt(urgencia || '0'),
            fecha_limite: fechaLimite,
            descripcion,
            habitos,
            duracion_minutos: parseInt(duracionMinutos || '0'),
        }

        try {
            const res = await fetch('https://assistant-90rv.onrender.com/tasks/prioritize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, eventos: [] }),
            })

            if (!res.ok) throw new Error('Error al crear la tarea')

            const data = await res.json()

            toast.success('✅ Tarea agregada con éxito', {
                description: `
📌 ${data.evento.titulo}
🕒 ${new Date(data.evento.inicio).toLocaleString()} - ${new Date(data.evento.fin).toLocaleString()}
🎯 Prioridad: ${data.evento.prioridad}
                `,
                duration: 6000,
                style: {
                    background: '#111',
                    color: '#fff',
                },
                icon: '📌',
                className: 'rounded-xl',
                position: 'top-right',
            })

            
            setTitulo('')
            setUrgencia('')
            setFechaLimite('')
            setDescripcion('')
            setHabitos('')
            setDuracionMinutos('')
        } catch (err) {
            console.error(err)
            toast.error('❌ Error al agregar la tarea')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 col-span-2 shadow-md">
            <h3 className="font-bold text-lg mb-4">Crear Tarea</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block font-bold text-sm text-black mb-1">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-bold text-sm text-black mb-1">Duración esperada (minutos)</label>
                    <input
                        type="number"
                        value={duracionMinutos}
                        onChange={(e) => setDuracionMinutos(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Urgencia (1-5)</label>
                <input
                    type="number"
                    min={1}
                    max={5}
                    value={urgencia}
                    onChange={(e) => setUrgencia(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Fecha de entrega</label>
                <input
                    type="date"
                    value={fechaLimite}
                    onChange={(e) => setFechaLimite(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Hábitos (opcional)</label>
                <input
                    type="text"
                    value={habitos}
                    onChange={(e) => setHabitos(e.target.value)}
                    placeholder="Ej. trabajo de 5am a 2pm"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                    Crear Tarea
                </button>
            </div>
        </form>
    )
}
