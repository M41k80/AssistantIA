"use client";
import { sampleFinanzas } from "../lib/sampleFinancialData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#64748b"];

export default function GastosPieChart() {
    const data = sampleFinanzas.gastos.map((gasto) => ({
        name: gasto.categoria,
        value: gasto.monto,
    }));

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-medium text-lg mb-4">Distribución de Gastos</h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
                {data.map((item, index) => (
                    <div className="flex items-center text-sm" key={index}>
                        <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>
                            {item.name}: ${item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
