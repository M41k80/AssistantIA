"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const { register, loading, error, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [habitos, setHabitos] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(email, password, nombre, habitos);
    };

    
    useEffect(() => {
        if (user) {
            router.push("/Dashboard");
        }
    }, [user, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white shadow-lg rounded-lg p-8"
            >
                <h1 className="text-3xl font-bold mb-8 text-blue-600 text-center">
                    Registro
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />

                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Hábitos"
                    className="w-full p-3 mb-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800"
                    value={habitos}
                    onChange={(e) => setHabitos(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-60"
                >
                    {loading ? "Registrando..." : "Registrar"}
                </button>

                {error && (
                    <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
                )}
            </form>
        </div>
    );
}
