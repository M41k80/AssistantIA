"use client";

import React, { useState } from "react";
import axios from "axios";
import { ArrowUp } from "lucide-react";

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
    if (!nombreNegocio || !producto || !objetivo || !tono || !publicoObjetivo)
      return;

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
      // Reset input fields after submission
      setNombreNegocio("");
      setProducto("");
      setObjetivo("");
      setTono("");
      setPublicoObjetivo("");
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
    <div className="flex flex-col items-center justify-between min-h-[85vh] max-w-4xl mx-auto">
      {!resultado ? (
        <>
          <div className="text-center mb-12 pt-20">
            {loading ? (
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10">
                <p className="mb-4 text-blue-500 text-base sm:text-lg">
                  Generando Email...
                </p>
                <div className="animate-spin rounded-full h-32 w-32 border-[12px] border-blue-200 border-t-blue-500" />
              </div>
            ) : (
              <>
                {/*Email Generator Header*/}
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Contanos qué querés lograr con tu campaña
                </h2>
                <p className="text-gray-600 mb-4 max-w-2xl">
                  Ingresá toda la información clave sobre tu producto, servicio,
                  promoción o mensaje que querés comunicar. Nuestra inteligencia
                  artificial va a generar un email pensado para tu audiencia con
                  un tono y estilo que se adaptan a tu objetivo.
                </p>
                <p className="text-gray-600">
                  Mientras más claro seas, mejor será el resultado.
                  <br />
                  <strong>¡Empecemos!</strong>
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          {resultado?.image && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-black mb-2">
                Imagen generada
              </h3>

              <img
                src={resultado.image}
                alt="Imagen del email"
                className="w-full max-w-md rounded shadow-md"
              />
            </div>
          )}
          {resultado?.email && (
            <div className="mt-10 mb-10 bg-claro p-6 rounded shadow-md">
              {/*Resultado*/}
              {/* <h2 className="text-xl font-semibold text-blue-600 mb-2">Resultado</h2> */}

              <p className="text-black mb-1 font-bold">Asunto:</p>
              <p className="text-oscuro mb-4">{resultado.email.subject}</p>

              <p className="text-black mb-1 font-bold">Vista previa:</p>
              <p className="text-oscuro mb-4">{resultado.email.preview}</p>

              <p className="text-black mb-1 font-bold">Cuerpo del Email:</p>
              <div
                className="text-oscuro prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: resultado.email.body }}
              />

              <p className="mt-4 text-black mb-1 font-bold">
                Llamado a la acción (CTA):
              </p>
              <p className="text-oscuro">{resultado.email.cta}</p>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(emailTextoCompleto)
                }
                className="mt-4 text-sm text-blue-400 hover:underline"
              >
                Copiar texto completo
              </button>
            </div>
          )}
        </div>
      )}
      {/*Input fields*/}
      <div className="w-max pb-8">
        <div className="relative">
          <div className="bg-gray-100 w-full p-4 pr-16 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex flex-row gap-4">
            <input
              type="text"
              className="border border-gray-300 p-2 rounded text-oscuro"
              placeholder="Nombre del negocio"
              value={nombreNegocio}
              onChange={(e) => setNombreNegocio(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 rounded text-oscuro"
              placeholder="Producto"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 rounded text-oscuro"
              placeholder="Objetivo (ej: conseguir nuevos clientes)"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 rounded text-oscuro"
              placeholder="Tono (ej: profesional, divertido, directo)"
              value={tono}
              onChange={(e) => setTono(e.target.value)}
            />
            <input
              type="text"
              className="border border-gray-300 p-2 rounded text-oscuro"
              placeholder="Público objetivo"
              value={publicoObjetivo}
              onChange={(e) => setPublicoObjetivo(e.target.value)}
            />
          </div>
          {/* Input Button */}
          <button
            onClick={handleSubmit}
            className="absolute right-3 bottom-3 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
