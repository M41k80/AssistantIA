"use client"
import React, { useState } from "react"
import { MessageCircle, X } from "lucide-react"

const FloatingChat = () => {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        { from: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = { from: "user", text: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const response = await fetch("https://assistantia-20o5.onrender.com/chat/assist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mensaje: input })
            })

            const data = await response.json()
            console.log("Respuesta del backend:", data)
            const botReply = data?.respuesta_ia || "Lo siento, no entendí eso."

            setMessages((prev) => [...prev, { from: "bot", text: botReply }])
        } catch (error) {
            console.error("Error al enviar mensaje:", error)
            setMessages((prev) => [...prev, { from: "bot", text: "Error al conectarse con el asistente." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {open ? (
                <div className="w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col">
                    
                    <div className="flex items-center justify-between px-4 py-2 border-b bg-blue-600 text-white rounded-t-xl">
                        <h3 className="font-bold">Asistente IA</h3>
                        <button onClick={() => setOpen(false)}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${msg.from === "user"
                                        ? "bg-blue-100 ml-auto text-right"
                                        : "bg-gray-100 text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-gray-400 text-sm italic">Escribiendo...</div>
                        )}
                    </div>

                    
                    <div className="p-2 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Escribe tu mensaje..."
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            disabled={loading}
                        />
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
                >
                    <MessageCircle className="w-8 h-8 mr-2" />
                </button>
            )}
        </div>
    )
}

export default FloatingChat
