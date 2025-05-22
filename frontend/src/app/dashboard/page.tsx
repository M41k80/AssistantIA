import React from 'react'
import { Sidebar } from "@/components/Sidebar/Sidebar"
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'

const DashboardPage = () => {
    return (
<div className="min-h-screen bg-black">
      <Sidebar />

      <div className="ml-16 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-black">Hola! listo para crear tu campaña?</h1>
            <ProfileHeader />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card placeholders */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-blue-50 rounded-xl h-36" />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm text-black cursor-pointer transform transition-transform duration-300 hover:scale-105">Ver más</button>
            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm text-black cursor-pointer transform transition-transform duration-300 hover:scale-105">Crear campaña</button>
          </div>

          {/* Promo Card */}
          <div className="max-w-md ml-auto">
            <div className="bg-[#1E1E1E] text-white p-6 rounded-xl">
              <div className="mb-2">
                <span className="text-lg font-bold">Proba</span>
                <span className="text-xs bg-white text-black px-2 py-0.5 rounded-sm ml-2">gratis</span>
                <span className="text-lg font-bold ml-2">7 días la</span>
              </div>
              <h3 className="text-lg font-bold mb-2">app de Email Marketing con IA</h3>

              <p className="text-sm text-gray-300 mb-4">
                Automatizá tus campañas, organizá tus tareas y controlá tus gastos. Todo desde un solo lugar, sin
                complicaciones.
              </p>

              <button className="bg-white text-black text-sm px-4 py-2 rounded-full">Empezá ahora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default DashboardPage;
