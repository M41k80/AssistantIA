'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import jsPDF from 'jspdf'

export default function ScrapeResultsViewer() {
    // eslint-disable-next-line
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('https://assistant-90rv.onrender.com/scraper/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                throw new Error('Error al subir el archivo.')
            }

            const data = await res.json()
            setResults(data?.resultados || [])
        } catch (err) {
            console.error(err)
            setError('Hubo un problema al subir el archivo o procesar los datos.')
        } finally {
            setLoading(false)
        }
    }

    const exportToPDF = () => {
        const doc = new jsPDF()
        doc.setFontSize(12)

        results.forEach((res, index) => {
            const yStart = 10 + index * 70
            let y = yStart

            doc.text(`URL: ${res.url}`, 10, y)
            y += 10

            if (res.error) {
                doc.text(`Error: ${res.error}`, 10, y)
                return
            }

            doc.text(`Título: ${res.titulo || '-'}`, 10, y)
            y += 10
            doc.text(`H1: ${res.h1 || '-'}`, 10, y)
            y += 10
            doc.text(`Meta descripción: ${res.meta_description || '-'}`, 10, y)
            y += 10
            doc.text(`Emails: ${res.emails?.join(', ') || '-'}`, 10, y)
            y += 10
            doc.text(`Teléfonos: ${res.telefonos?.join(', ') || '-'}`, 10, y)
            y += 10

            const redes = Object.entries(res.redes_sociales || {})
                .map(([key, val]) => `${key}: ${(val as string[]).join(', ')}`)
                .join(' | ')
            doc.text(`Redes sociales: ${redes || '-'}`, 10, y)
        })

        doc.save('resultados_scraping.pdf')
    }

    return (
        <div>
            <section className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-4 text-gray-700">
                <FileText size={24} color='blue'/> Resultados del Scraping
            </h1>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-4xl cursor-pointer"
            />

            {loading && <p className='text-gray-700'>Cargando resultados...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {results.length > 0 && (
                <>
                <div className="flex mb-6">
                    <button
                        onClick={exportToPDF}
                        className="bg-blue-500 text-white px-4 py-2 rounded-4xl hover:bg-blue-700 mb-6 "
                    ><strong>Descargar en PDF</strong>
                        
                    </button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((res, index) => (
                            <div key={index} className="border p-4 rounded shadow bg-white">
                                <h2 className="font-semibold text-lg mb-2 text-blue-700 break-all">
                                    {res.url}
                                </h2>
                                {res.error ? (
                                    <p className="text-red-500">❌ Error: {res.error}</p>
                                ) : (
                                    <>
                                        <p className='text-gray-700'><strong>Título:</strong> {res.titulo || '-'}</p>
                                        <p className='text-gray-700'><strong>H1:</strong> {res.h1 || '-'}</p>
                                        <p className='text-gray-700'><strong>Meta:</strong> {res.meta_description || '-'}</p>
                                        <p className='text-gray-700'><strong>Emails:</strong> {res.emails?.join(', ') || '-'}</p>
                                        <p className='text-gray-700'><strong>Teléfonos:</strong> {res.telefonos?.join(', ') || '-'}</p>
                                        <p className='text-gray-700'>
                                            <strong>Redes sociales:</strong>{' '}
                                            {res.redes_sociales
                                                ? Object.entries(res.redes_sociales)
                                                    .map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`)
                                                    .join(' | ')
                                                : '-'}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
            </section>
            
        </div>
    )
}
