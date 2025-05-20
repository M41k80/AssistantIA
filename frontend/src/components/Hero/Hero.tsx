import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => { 
    return (
        <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-center space-x-8 text-gray-800">
          <Link href="#servicios" className="hover:text-gray-600 font-medium">
            Servicios
          </Link>
          <Link href="#nosotros" className="hover:text-gray-600 font-medium">
            Nosotros
          </Link>
          <Link href="#contacto" className="hover:text-gray-600 font-medium">
            Contacto
          </Link>
          <Link href="/login" className="hover:text-gray-600 font-medium">
            Ingresar
          </Link>
          <Link href="/registrarse" className="hover:text-gray-600 font-medium">
            Registrarse
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 leading-tight mb-6">
              Crea Campañas de email irresistibles con el poder de la IA
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Campañas más efectivas, resultados más rápidos. Tu próximo email empieza aquí
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Comenzar ahora
            </button>
          </div>

          {/* Right Column - Image with floating elements */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="WomanWithLaptop.svg"
                alt="Persona usando laptop para campañas de email"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>

            {/* Campaign Sent Notification */}
            <div className="absolute top-20 right-10 z-20 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Optional) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-black">
            Potencia tus campañas con inteligencia artificial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">

              <h3 className="text-xl font-semibold mb-2 text-black">Contenido personalizado</h3>
              <p className="text-gray-600">
                Genera contenido personalizado para cada segmento de tu audiencia automáticamente.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Análisis predictivo</h3>
              <p className="text-gray-600">
                Predice el rendimiento de tus campañas antes de enviarlas y optimiza para mejores resultados.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Optimización automática</h3>
              <p className="text-gray-600">
                Mejora continuamente tus campañas con optimización automática basada en resultados anteriores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}

export default Hero;