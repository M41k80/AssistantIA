'use client'

import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import jsPDF from 'jspdf'

export default function ScrapeResultPage() {
    const searchParams = useSearchParams()
    // eslint-disable-next-line
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const jsonParam = searchParams.get('json')

    useEffect(() => {
        if (jsonParam) {
            try {
                const parsed = JSON.parse(decodeURIComponent(jsonParam))
                setResults(parsed)
            } catch {
                setError('Error al parsear los resultados.')
            }
        } else {
            setError('No se encontraron datos para mostrar.')
        }
        setLoading(false)
    }, [jsonParam])

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

    if (loading) return <div className="p-4">Cargando...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FileText size={28} />
                Resultados del Scraping
            </h1>

            {results.length > 0 && (
                <button
                    onClick={exportToPDF}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-6"
                >
                    Descargar PDF de resultados
                </button>
            )}

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
                                <p><strong>Título:</strong> {res.titulo || '-'}</p>
                                <p><strong>H1:</strong> {res.h1 || '-'}</p>
                                <p><strong>Meta:</strong> {res.meta_description || '-'}</p>
                                <p><strong>Emails:</strong> {res.emails?.join(', ') || '-'}</p>
                                <p><strong>Teléfonos:</strong> {res.telefonos?.join(', ') || '-'}</p>
                                <p>
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
        </div>
    )
}