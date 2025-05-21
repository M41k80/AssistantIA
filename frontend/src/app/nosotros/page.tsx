import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NosotrosPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Sobre Nosotros</h1>

                    <div className="bg-white p-8 rounded-lg shadow-md mb-12">
                        <h2 className="text-xl font-bold mb-4">Nuestra Misión</h2>
                        <p className="text-neutral-600 mb-6">
                            Nuestra misión es simplificar el trabajo diario de profesionales y empresas mediante herramientas
                            inteligentes que automatizan tareas repetitivas, permitiéndoles enfocarse en lo que realmente importa:
                            hacer crecer su negocio y atender a sus clientes.
                        </p>

                        <h2 className="text-xl font-bold mb-4">Nuestra Historia</h2>
                        <p className="text-neutral-600 mb-6">
                            Fundada en 2022, nuestra empresa nació de la necesidad de integrar la inteligencia artificial en las
                            tareas cotidianas de marketing y gestión empresarial. Lo que comenzó como una simple herramienta de email
                            marketing ha evolucionado en una suite completa de productividad impulsada por IA.
                        </p>

                        <h2 className="text-xl font-bold mb-4">Nuestros Valores</h2>
                        <ul className="space-y-4">
                            <li className="flex">
                                <div className="mr-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Innovación</h3>
                                    <p className="text-neutral-600">
                                        Constantemente buscamos nuevas formas de aplicar la IA para resolver problemas cotidianos.
                                    </p>
                                </div>
                            </li>
                            <li className="flex">
                                <div className="mr-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Seguridad</h3>
                                    <p className="text-neutral-600">
                                        Protegemos los datos de nuestros clientes con los más altos estándares de seguridad.
                                    </p>
                                </div>
                            </li>
                            <li className="flex">
                                <div className="mr-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">Comunidad</h3>
                                    <p className="text-neutral-600">
                                        Creemos en construir relaciones duraderas con nuestros clientes y la comunidad empresarial.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-8 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Nuestro Equipo</h2>
                        <p className="text-neutral-600 text-center mb-8">
                            Somos un equipo diverso de profesionales apasionados por la tecnología y la innovación.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-medium">María González</h3>
                                <p className="text-sm text-neutral-600">CEO & Fundadora</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-medium">Carlos Rodríguez</h3>
                                <p className="text-sm text-neutral-600">CTO</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-medium">Laura Martínez</h3>
                                <p className="text-sm text-neutral-600">Directora de Producto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
