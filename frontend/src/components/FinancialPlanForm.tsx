"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
    const [gastos, setGastos] = useState<Gasto[]>([{ categoria: "", descripcion: "", monto: 0 }]);
    // eslint-disable-next-line
    const [resultado, setResultado] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddGasto = () => {
        setGastos([...gastos, { categoria: "", descripcion: "", monto: 0 }]);
    };

    const handleChangeGasto = (index: number, field: keyof Gasto, value: string | number) => {
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
            const res = await fetch(`https://assistantia-20o5.onrender.com/budget/plan`, {
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
            });

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
            setError("Error al conectar con el servidor, se mostraron cálculos locales.");
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
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mt-10">
            <h2 className="text-4xl font-bold mb-6 text-cyan-400 text-center">Calculadora Financiera</h2>

            {!resultado ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1">💵 Ingresos mensuales</label>
                        <input
                            type="number"
                            value={ingresos}
                            onChange={(e) => setIngresos(parseFloat(e.target.value))}
                            className="w-full px-4 py-2 bg-white text-black rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">🎯 Meta de ahorro mensual</label>
                        <input
                            type="number"
                            value={metasAhorro}
                            onChange={(e) => setMetasAhorro(parseFloat(e.target.value))}
                            className="w-full px-4 py-2 bg-white text-black rounded"
                            required
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-cyan-300 mb-2">📦 Gastos</h3>
                        {gastos.map((gasto, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded mb-3 space-y-2">
                                <select
                                    value={gasto.categoria}
                                    onChange={(e) => handleChangeGasto(index, "categoria", e.target.value)}
                                    className="w-full px-3 py-2 bg-white text-black rounded"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categoriasPredefinidas.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Descripción"
                                    value={gasto.descripcion}
                                    onChange={(e) => handleChangeGasto(index, "descripcion", e.target.value)}
                                    className="w-full px-3 py-2 bg-white text-black rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Monto"
                                    value={gasto.monto}
                                    onChange={(e) => handleChangeGasto(index, "monto", e.target.value)}
                                    className="w-full px-3 py-2 bg-white text-black rounded"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddGasto}
                            className="text-sm text-cyan-400 hover:underline"
                        >
                            + Agregar otro gasto
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        {loading ? "Calculando..." : "Calcular plan"}
                    </button>
                </form>
            ) : (
                <div className="bg-white text-black p-6 rounded-lg mt-6">
                    <h3 className="text-2xl font-bold text-cyan-600 mb-4">🧾 Resultado</h3>
                    <p><strong>Ingresos totales:</strong> ${ingresos}</p>
                    <p><strong>Gastos totales:</strong> ${resultado.gastos_totales}</p>
                    <p><strong>Saldo disponible:</strong> ${resultado.saldo_disponible}</p>
                    <p><strong>¿Puedes ahorrar tu meta?:</strong> {resultado.puedes_ahorrar_meta ? "✅ Sí" : "❌ No"}</p>

                    {resultado.recomendaciones?.length > 0 && (
                        <>
                            <h4 className="text-lg font-semibold mt-4">💡 Recomendaciones:</h4>
                            <ul className="list-disc list-inside">
                                {resultado.recomendaciones.map((r: string, idx: number) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {resultado.plan_ahorro && (
                        <>
                            <h4 className="text-lg font-semibold mt-4">📈 Plan de Ahorro:</h4>
                            <p>💰 Ahorro sugerido: ${resultado.plan_ahorro.cantidad} ({(resultado.plan_ahorro.porcentaje_ingresos * 1).toFixed(2)}%)</p>
                        </>
                    )}

                    {resultado.distribucion && (
                        <>
                            <h4 className="text-lg font-semibold mt-4">📊 Distribución sugerida:</h4>
                            <ul className="list-disc list-inside">
                                {Object.entries(resultado.distribucion).map(([cat, percent]) => (
                                    <li key={cat}>{cat}: {typeof percent === 'number' ? percent.toFixed(2) : '0.00'}%</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <button
                        onClick={handleReset}
                        className="mt-6 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded"
                    >
                        🔁 Calcular de nuevo
                    </button>
                </div>
            )}

            {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
    );
}