import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ServiciosPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Email Marketing */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-blue-600"
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
                            <h2 className="text-xl font-bold mb-4 text-center">Email Marketing con IA</h2>
                            <p className="text-neutral-600 mb-4">
                                Nuestro sistema de Email Marketing potenciado con Inteligencia Artificial te permite crear campañas
                                efectivas en segundos. Solo dile a la IA qué quieres comunicar y ella se encargará del resto.
                            </p>
                            <ul className="space-y-2 text-neutral-600">
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Creación de contenido automática
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Optimización de asuntos para mayor apertura
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Análisis de resultados en tiempo real
                                </li>
                            </ul>
                        </div>

                        
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-blue-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 20V10" />
                                        <path d="M18 20V4" />
                                        <path d="M6 20v-6" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mb-4 text-center">Gestión de Tareas Inteligente</h2>
                            <p className="text-neutral-600 mb-4">
                                Organiza tus tareas de forma simple y efectiva. Nuestra IA prioriza automáticamente lo importante,
                                permitiéndote enfocarte en lo que realmente importa.
                            </p>
                            <ul className="space-y-2 text-neutral-600">
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Priorización automática de tareas
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Recordatorios inteligentes
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Integración con tu calendario
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
