"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

interface Gasto {
  categoria: string;
  descripcion: string;
  monto: number;
}

const categoriasPredefinidas = [
  "Alquiler",
  "Comida",
  "Transporte",
  "Salud",
  "Entretenimiento",
  "Suscripciones",
  "Otros",
];

export default function FinancialPlanForm() {
  // eslint-disable-next-line
  const { user } = useAuth();
  const [ingresos, setIngresos] = useState(0);
  const [metasAhorro, setMetasAhorro] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([
    { categoria: "", descripcion: "", monto: 0 },
  ]);
  // eslint-disable-next-line
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [historial, setHistorial] = useState<any[]>([]);

  const handleAddGasto = () => {
    setGastos([...gastos, { categoria: "", descripcion: "", monto: 0 }]);
  };

  const handleChangeGasto = (
    index: number,
    field: keyof Gasto,
    value: string | number
  ) => {
    const nuevosGastos = [...gastos];
    // eslint-disable-next-line
    (nuevosGastos[index] as any)[field] =
      field === "monto" ? parseFloat(value as string) : (value as string);
    setGastos(nuevosGastos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const gastosTotales = gastos.reduce((acc, g) => acc + (g.monto || 0), 0);
    const saldoDisponible = ingresos - gastosTotales;
    const puedesAhorrar = saldoDisponible >= metasAhorro;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://assistant-90rv.onrender.com/budget/plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ingresos,
            gastos,
            metas_ahorro: metasAhorro,
          }),
        }
      );

      const data = await res.json();

      setResultado({
        ...data,
        gastos_totales: gastosTotales,
        saldo_disponible: saldoDisponible,
        puedes_ahorrar_meta: puedesAhorrar,
      });
    } catch {
      setResultado({
        gastos_totales: gastosTotales,
        saldo_disponible: saldoDisponible,
        puedes_ahorrar_meta: puedesAhorrar,
        recomendaciones: [],
        plan_ahorro: null,
        distribucion: null,
      });
      setError(
        "Error al conectar con el servidor, se mostraron cálculos locales."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultado(null);
    setGastos([{ categoria: "", descripcion: "", monto: 0 }]);
    setMetasAhorro(0);
    setIngresos(0);
  };

  return (
    <div className="bg-white p-6 min-h-[calc(100vh-2rem)]">
      {!resultado ? (
        <>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-black">
              Calculadora Financiera
            </h1>
            <ProfileHeader />
          </div>
          {/* Description */}
          <div className="mb-8 max-w-3xl">
            <h2 className="text-lg font-semibold mb-2 text-black">
              Contanos qué querés lograr con tu campaña
            </h2>
            <p className="text-gray-600">
              Ingresá tu ingreso mensual, la meta de ahorro que querés alcanzar
              y tus gastos habituales. Nuestra inteligencia artificial va a
              analizar tus datos y devolverte un plan de ahorro personalizado
              con recomendaciones, alertas y una distribución sugerida para que
              logres tus objetivos financieros.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Income and Savings Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💵 Ingresos mensuales
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={ingresos}
                    onChange={(e) => setIngresos(parseFloat(e.target.value))}
                    className="w-full pl-8 p-3 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 Meta de ahorro mensual
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={metasAhorro}
                    onChange={(e) => setMetasAhorro(parseFloat(e.target.value))}
                    className="w-full pl-8 p-3 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Expenses */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                📦 Gastos
              </h3>
              {gastos.map((gasto, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={gasto.categoria}
                      onChange={(e) =>
                        handleChangeGasto(index, "categoria", e.target.value)
                      }
                      className="w-full p-3 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categoriasPredefinidas.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={gasto.descripcion}
                      onChange={(e) =>
                        handleChangeGasto(index, "descripcion", e.target.value)
                      }
                      className="w-full p-3 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto del gasto
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-3 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Monto"
                        value={gasto.monto}
                        onChange={(e) =>
                          handleChangeGasto(index, "monto", e.target.value)
                        }
                        className="w-full pl-8 p-3 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddGasto}
                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                + Agregar otro gasto
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              {loading ? "Calculando..." : "Calcular plan"}
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-black">Resultados</h1>
            <ProfileHeader />
          </div>
          <div className="bg-white p-6 min-h-[calc(100vh-2rem)] text-gray-900">
            {/* Result Section */}

            {/* Financial Summary */}
            <div className="mb-8">
              <p className="text-lg mb-1">
                <strong>Ingresos totales:</strong> ${ingresos}
              </p>
              <p className="text-lg mb-1">
                {" "}
                <strong>Gastos totales:</strong> ${resultado.gastos_totales}
              </p>
              <p className="text-lg mb-1">
                <strong>Saldo disponible:</strong> ${resultado.saldo_disponible}
              </p>
            </div>
            {/* Savings Goal */}
            <div className="mb-8">
              <p className="text-xl font-semibold mb-2">
                <strong>¿Puedes ahorrar tu meta?:</strong>{" "}
                {resultado.puedes_ahorrar_meta ? "✅ Sí" : "❌ No"}
              </p>
            </div>

            {resultado.recomendaciones?.length > 0 && (
              <div className="mb-8">
                {/* Recommendations */}
                <h2 className="text-xl font-semibold mb-3">
                  💡 Recomendaciones:
                </h2>
                <ul className="list-disc pl-8 space-y-2">
                  {resultado.recomendaciones.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {resultado.plan_ahorro && (
              <div className="mb-8">
                {/* Savings Plan */}
                <h2 className="text-xl font-semibold mb-3">
                  📈 Plan de Ahorro:
                </h2>
                <ul className="list-disc pl-8 space-y-2">
                  <li>
                    💰 Ahorro sugerido: ${resultado.plan_ahorro.cantidad} (
                    {(resultado.plan_ahorro.porcentaje_ingresos * 1).toFixed(2)}
                    %){" "}
                  </li>
                </ul>
              </div>
            )}

            {resultado.distribucion && (
              <div className="mb-8">
                {/* Distribution */}
                <h2 className="text-xl font-semibold mb-3">
                  📊 Distribución sugerida:
                </h2>
                <ul className="list-disc pl-8 space-y-2">
                  {Object.entries(resultado.distribucion).map(
                    ([cat, percent]) => (
                      <li key={cat}>
                        {cat}:{" "}
                        {typeof percent === "number"
                          ? percent.toFixed(2)
                          : "0.00"}
                        %
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {/* Calculate Again Button */}
            <button
              onClick={handleReset}
              className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              🔁 Calcular de nuevo
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
}
