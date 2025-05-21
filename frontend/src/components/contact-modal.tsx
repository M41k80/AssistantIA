"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ContactModalProps {
    open: boolean
    onClose: () => void
}

export function ContactModal({ open, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar el formulario
        console.log("Formulario enviado:", formData)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-neutral-800 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Contacto</DialogTitle>
                </DialogHeader>
                <div className="text-center mb-4">
                    <p className="text-neutral-300 text-sm">¿Tenés alguna duda o querés hablar con nuestro equipo?</p>
                    <p className="text-neutral-300 text-sm">Escribinos y te responderemos a la brevedad.</p>
                </div>
                <div className="flex justify-center mb-4">
                    <div className="bg-neutral-700 p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="bg-neutral-700 border-neutral-600 text-white"
                        />
                        <Input
                            name="correo"
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData.correo}
                            onChange={handleChange}
                            className="bg-neutral-700 border-neutral-600 text-white"
                        />
                        <Input
                            name="asunto"
                            placeholder="Asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            className="bg-neutral-700 border-neutral-600 text-white"
                        />
                        <Textarea
                            name="mensaje"
                            placeholder="Mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            className="bg-neutral-700 border-neutral-600 text-white min-h-[120px]"
                        />
                        <Button type="submit" className="w-full">
                            Enviar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
