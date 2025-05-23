"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProfileInfoModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    image: string | null
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEditClick: () => void
}

const ProfileInfoModal = ({ open, setOpen, image, onImageChange, onEditClick }: ProfileInfoModalProps) => {
    const [userData, setUserData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        campoAcademico: "",
        idioma: "Español, Inglés"
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            setUserData({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                email: user.email || "",
                campoAcademico: user.campoAcademico || "",
                idioma: user.idioma || "Español, Inglés"
            })
        }
    }, [open])

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
                {/* Header */}
                <div className="p-6 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Información del perfil</h2>
                        <button 
                            onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Información del usuario */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-500">Nombre</label>
                                <div className="text-gray-800 font-medium">{userData.nombre}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-500">Apellido</label>
                                <div className="text-gray-800 font-medium">{userData.apellido}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <div className="text-gray-800 font-medium">{userData.email}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-500">Campo académico</label>
                                <div className="text-gray-800 font-medium">{userData.campoAcademico || "-"}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-500">Idioma</label>
                                <div className="text-gray-800 font-medium">{userData.idioma}</div>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                {image ? (
                                    <Image
                                        src={image}
                                        alt="Avatar del usuario"
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                                    />
                                ) : (
                                    <Image
                                        src="/m41k80.ico"
                                        alt="Avatar por defecto"
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                                    />
                                )}
                                <label className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">
                                        Cambiar foto
                                    </span>
                                    <input
                                        type="file"
                                        onChange={onImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={onEditClick}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Actualizar perfil
                        </button>
                        <button className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors">
                            Cambiar de plan
                        </button>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-100 my-4"></div>

                    {/* Eliminar cuenta */}
                    <button className="w-full text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                        Eliminar cuenta
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfoModal