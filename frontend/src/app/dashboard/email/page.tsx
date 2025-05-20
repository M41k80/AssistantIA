"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import axios from "axios";

const EmailGenerator = () => {
    const { user } = useAuth();
    const [nombreNegocio, setNombreNegocio] = useState("");
    const [producto, setProducto] = useState("");
    const [tono, setTono] = useState("");
    const [publicoObjetivo, setPublicoObjetivo] = useState("");
    const [resultado, setResultado] = useState<{
        imagen?: string;
        texto?: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!nombreNegocio || !producto || !tono || !publicoObjetivo) return;

        try {
            if (!user) return;
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/generate-email`,
                {
                    nombre_negocio: nombreNegocio,
                    producto,
                    tono,
                    publico_objetivo: publicoObjetivo,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
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

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">¡Vamos a crear tu próximo email con IA!</h1>

            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Nombre del negocio"
                    value={nombreNegocio}
                    onChange={(e) => setNombreNegocio(e.target.value)}
                />
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Producto"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                />
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Tono (ej: profesional, divertido, directo)"
                    value={tono}
                    onChange={(e) => setTono(e.target.value)}
                />
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Público objetivo"
                    value={publicoObjetivo}
                    onChange={(e) => setPublicoObjetivo(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    disabled={loading}
                >
                    {loading ? "Generando..." : "Generar Email con IA"}
                </button>
            </div>

            {resultado && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-2">Diseño generado</h2>

                    {resultado.imagen && (
                        <Image
                            src={resultado.imagen}
                            alt="Email generado"
                            width={500}
                            height={300}
                            className="w-full max-w-md rounded shadow-md"
                            priority
                        />
                    )}

                    {resultado.texto && (
                        <div className="mt-4 whitespace-pre-line text-gray-700">
                            {resultado.texto}
                        </div>
                    )}

                    <button
                        onClick={() => resultado.texto && navigator.clipboard.writeText(resultado.texto)}
                        className="mt-2 text-blue-500 text-sm underline"
                    >
                        Copiar texto
                    </button>

                </div>
            )}
        </div>
    );
};

export default EmailGenerator;
