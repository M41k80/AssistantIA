"use client";

import React, { useState } from "react";
import axios from "axios";

const EmailGenerator = () => {
    const [nombreNegocio, setNombreNegocio] = useState("");
    const [producto, setProducto] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [tono, setTono] = useState("");
    const [publicoObjetivo, setPublicoObjetivo] = useState("");
    // eslint-disable-next-line
    const [resultado, setResultado] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!nombreNegocio || !producto || !objetivo || !tono || !publicoObjetivo) return;

        try {
            setLoading(true);
            const { data } = await axios.post(
                "https://assistantia-20o5.onrender.com/emails/generate-email",
                {
                    nombre_negocio: nombreNegocio,
                    producto,
                    objetivo,
                    tono,
                    publico_objetivo: publicoObjetivo,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setResultado(data);
        } catch (error) {
            console.error("Error generando email:", error);
        } finally {
            setLoading(false);
        }
    };

    const emailTextoCompleto = resultado?.email
        ? `Asunto: ${resultado.email.subject}\n\nVista previa: ${resultado.email.preview}\n\n${resultado.email.body}\n\nCTA: ${resultado.email.cta}`
        : "";

    return (
        <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Generador de Emails con IA</h1>

            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
                    placeholder="Nombre del negocio"
                    value={nombreNegocio}
                    onChange={(e) => setNombreNegocio(e.target.value)}
                />
                <input
                    type="text"
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
                    placeholder="Producto"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                />
                <input
                    type="text"
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
                    placeholder="Objetivo (ej: conseguir nuevos clientes)"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                />
                <input
                    type="text"
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
                    placeholder="Tono (ej: profesional, divertido, directo)"
                    value={tono}
                    onChange={(e) => setTono(e.target.value)}
                />
                <input
                    type="text"
                    className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
                    placeholder="Público objetivo"
                    value={publicoObjetivo}
                    onChange={(e) => setPublicoObjetivo(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? "Generando..." : "Generar Email con IA"}
                </button>
            </div>

            {resultado?.email && (
                <div className="mt-10 bg-gray-800 p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold text-blue-300 mb-2">Resultado</h2>

                    <p className="text-blue-200 mb-1 font-bold">Asunto:</p>
                    <p className="mb-4">{resultado.email.subject}</p>

                    <p className="text-blue-200 mb-1 font-bold">Vista previa:</p>
                    <p className="mb-4">{resultado.email.preview}</p>

                    <p className="text-blue-200 mb-1 font-bold">Cuerpo del Email:</p>
                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: resultado.email.body }}
                    />

                    <p className="mt-4 text-blue-200 mb-1 font-bold">Llamado a la acción (CTA):</p>
                    <p className="mb-4">{resultado.email.cta}</p>

                    <button
                        onClick={() => navigator.clipboard.writeText(emailTextoCompleto)}
                        className="mt-4 text-sm text-blue-400 hover:underline"
                    >
                        Copiar texto completo
                    </button>
                </div>
            )}

            {resultado?.image && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Imagen generada</h3>
                    
                    <img
                        src={resultado.image}
                        alt="Imagen del email"
                        className="w-full max-w-md rounded shadow-md"
                    />
                </div>
            )}
        </div>
    );
};

export default EmailGenerator;
