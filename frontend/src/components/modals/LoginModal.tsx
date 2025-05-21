"use client"

import react from "react";
import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image";

interface LoginModalProps {
  onClose: () => void
  onRegister: () => void
}

const LoginModal = ({ onClose, onRegister }: LoginModalProps) => { 

const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { email, password })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#3A3B45] text-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-300 hover:text-white">
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Ingresá a tu cuenta</h2>
          <p className="text-gray-300 text-sm">
            Accedé a la plataforma que organiza tus tareas, finanzas y campañas en un solo lugar.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="rounded-full p-2 hover:opacity-90 transition-opacity">
          <Image
            src="/google-icon.svg"  
            alt ="Google Icon"
            width={24}
            height={24}
            className="h-8 w-8"
            />
          </button>
          <button className="rounded-full p-2 hover:opacity-90 transition-opacity">
          <Image
            src="/lk-icon.svg"  
            alt ="Linkedin Icon"
            width={24}
            height={24}
            className="h-8 w-8"
            />
          </button>
          <button className="rounded-full p-2 hover:opacity-90 transition-opacity">
     <Image
            src="/facebook-icon.svg"  
            alt ="Facebook Icon"
            width={24}
            height={24}
            className="h-8 w-8"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">
              Correo electrónico:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-1">
              Correo electrónico:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md transition-colors mb-4"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="text-center text-sm">
          <p>
            ¿Todavía no tenés cuenta?{" "}
            <button onClick={onRegister} className="text-blue-400 hover:text-blue-300">
              Registrarme
            </button>
          </p>
        </div>
      </div>
    </div>
  )

}

export default LoginModal;