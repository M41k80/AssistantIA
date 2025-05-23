"use client";
import { sampleFinanzas } from "../lib/sampleFinancialData";

export default function FinancialSummary() {
    const totalGastos = sampleFinanzas.gastos.reduce((acc, g) => acc + g.monto, 0);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-2">
            <h2 className="text-xl font-bold mb-2">Resumen Financiero</h2>
            <p>💰 <strong>Ingresos:</strong> ${sampleFinanzas.ingresos}</p>
            <p>📉 <strong>Gastos:</strong> ${totalGastos}</p>
            <p>🎯 <strong>Meta de Ahorro:</strong> ${sampleFinanzas.metas_ahorro}</p>
        </div>
    );
}
