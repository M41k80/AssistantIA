"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { login, loading, error, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (user) return <p className="text-center mt-10 text-green-700">¡Estás logueado como {user.email}!</p>;

    


    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-blue-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-blue-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-60"
                >
                    {loading ? "Ingresando..." : "Entrar"}
                </button>

                {error && <p className="mt-3 text-red-600 text-center">{error}</p>}
            </form>
        </div>
    );
}
