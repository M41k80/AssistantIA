import react from "react";
import { useState } from "react"
import { X, ArrowLeft } from "lucide-react"

interface RegisterModalProps {
  onClose: () => void
  onBack: () => void
}

const RegisterModal = ({ onClose, onBack }: RegisterModalProps) =>{
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Registration attempt with:", { fullName, email, password, confirmPassword })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#3A3B45] text-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onBack} className="absolute left-4 top-4 text-gray-300 hover:text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>

        <button onClick={onClose} className="absolute right-4 top-4 text-gray-300 hover:text-white">
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Creá tu cuenta gratis</h2>
          <p className="text-gray-300 text-sm">
            Unite a la plataforma todo en uno que te ayuda a organizar, decidir y avanzar.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm mb-1">
              Nombre completo:
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="registerEmail" className="block text-sm mb-1">
              Correo electrónico:
            </label>
            <input
              id="registerEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="registerPassword" className="block text-sm mb-1">
              Contraseña:
            </label>
            <p className="text-xs text-gray-400 mb-1">Mínimo 8 caracteres</p>
            <input
              id="registerPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              minLength={8}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm mb-1">
              Confirmar contraseña:
            </label>
            <p className="text-xs text-gray-400 mb-1">Repetí tu contraseña</p>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors mb-4"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal;