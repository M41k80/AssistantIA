import React from 'react'
import { Sidebar } from "@/components/Sidebar/Sidebar"
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import { Search, Bell, ChevronLeft, ChevronRight } from "lucide-react"

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-black">
            {/* Calendar Card */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <button className="text-gray-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-medium">September 2021</h3>
                <button className="text-gray-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                <div className="font-medium">SAN</div>
                <div className="font-medium">MON</div>
                <div className="font-medium">TUE</div>
                <div className="font-medium">WED</div>
                <div className="font-medium">THU</div>
                <div className="font-medium">FRI</div>
                <div className="font-medium">SAT</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {[
                  { day: 1 },
                  { day: 2 },
                  { day: 3 },
                  { day: 4 },
                  { day: 5 },
                  { day: 6 },
                  { day: 7 },
                  { day: 8 },
                  { day: 9 },
                  { day: 10 },
                  { day: 11 },
                  { day: 12 },
                  { day: 13 },
                  { day: 14 },
                  { day: 15 },
                  { day: 16 },
                  { day: 17 },
                  { day: 18 },
                  { day: 19, active: true },
                  { day: 20 },
                  { day: 21 },
                  { day: 22 },
                  { day: 23 },
                  { day: 24 },
                  { day: 25 },
                  { day: 26 },
                  { day: 27 },
                  { day: 28 },
                  { day: 29 },
                  { day: 30 },
                  { day: 31 },
                ].map((date, index) => (
                  <div key={index} className={`py-1 ${date.active ? "bg-blue-500 text-white rounded-full" : ""}`}>
                    {date.day}
                  </div>
                ))}
              </div>
            </div>

            {/* Gastos Card */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-medium text-lg mb-4">Gastos</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Renta: 5200%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Renta: 5200%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Renta: 5200%</span>
                </div>
              </div>
            </div>

            {/* Pro Card with Chart */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-medium text-lg mb-4">pro</h3>
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray="50, 100"
                    />
                    <text x="18" y="20.5" textAnchor="middle" className="text-xs font-medium">
                      50%
                    </text>
                  </svg>

                </div>
              </div>
            </div>

            {/* Marketing Email Card */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="bg-black rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Correo de Marketing</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Este correo promocional podría generar 60 me gusta y 15.000 nuevos contactos
                  </p>
                </div>
                <div className="ml-auto flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Likes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>1.500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Task Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
            {/* Task Card */}
            <div className="bg-blue-50 rounded-xl p-6 col-span-2">
              <h3 className="font-bold text-lg mb-4">Crear Tarea</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-bold text-sm text-black mb-1">Título</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block font-bold text-sm text-black mb-1">Urgencia (en minutos)</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Fecha de entrega</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Descripción</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" rows={3}></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-bold text-sm text-black mb-1">Urgencia</label>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="w-1/3 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                  Calcular Plan
                </button>
              </div>
            </div>

            {/* Promo Card */}
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
