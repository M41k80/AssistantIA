import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactoPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-neutral-800 text-white rounded-lg p-8">
                        <h1 className="text-2xl font-bold text-center mb-2">Contacto</h1>
                        <p className="text-center text-neutral-300 text-sm mb-2">
                            ¿Tenés alguna duda o querés hablar con nuestro equipo?
                        </p>
                        <p className="text-center text-neutral-300 text-sm mb-6">Escribinos y te responderemos a la brevedad.</p>

                        <div className="flex justify-center mb-6">
                            <div className="bg-neutral-700 p-3 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <Input placeholder="Nombre" className="bg-neutral-700 border-neutral-600 text-white" />
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                className="bg-neutral-700 border-neutral-600 text-white"
                            />
                            <Input placeholder="Asunto" className="bg-neutral-700 border-neutral-600 text-white" />
                            <Textarea placeholder="Mensaje" className="bg-neutral-700 border-neutral-600 text-white min-h-[120px]" />
                            <Button type="submit" className="w-full">
                                Enviar
                            </Button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
