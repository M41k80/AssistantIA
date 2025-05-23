import React from 'react'
import { Sidebar } from "@/components/Sidebar/Sidebar"
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import CalendarWidget from '@/components/CalendarWidget/CalendarWidget'
import ChatBot from "@/components/ChatBot/ChatBot"
import TaskForm from '@/components/TaskForm'



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
            <CalendarWidget />

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
            <TaskForm />
            

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
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
    )
}

export default DashboardPage;
