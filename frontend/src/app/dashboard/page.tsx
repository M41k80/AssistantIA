import React from 'react'
import { Sidebar } from "@/components/Sidebar/Sidebar"
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import CalendarWidget from '@/components/CalendarWidget/CalendarWidget'
import ChatBot from "@/components/ChatBot/ChatBot"
import TaskForm from '@/components/TaskForm'
import FinancialSummary from '@/components/FinancialSummary'
import GastosPieChart from '@/components/GastosPieChart'
import PromoCard from '@/components/PromoCard'


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />

      <div className="ml-16 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-black">Hola! Soy tu <strong className='text-gray-600'>Assitant</strong><strong className='text-blue-500'>IA</strong>👋</h1>
            
            <ProfileHeader />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-black">
            {/* Calendar Card */}
            <CalendarWidget />

            <FinancialSummary />
            <GastosPieChart />

            {/* Marketing Email Card con explicación de IA */}
            <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col space-y-4">
              {/* Encabezado */}
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">Campaña: Semana Tech</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📩 ¡Lanzamos nuestra promoción exclusiva de verano! Hasta <span className="font-medium text-blue-600">40% de descuento</span> en laptops, audífonos y accesorios. Solo por esta semana, para suscriptores VIP.
                  </p>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="flex justify-between items-center border-t pt-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="mr-4">70 me gusta</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>18.200 contactos nuevos</span>
                </div>
              </div>

              {/* Análisis de IA */}
              <div className="text-sm text-gray-600 border-t pt-3">
                🤖 <span className="font-medium text-gray-800">Análisis de IA:</span> Esta campaña tiene un alto potencial debido a su enfoque en descuentos agresivos y segmentación exclusiva para usuarios VIP. Basado en campañas anteriores, las promociones con porcentajes altos y duración limitada generan mayor urgencia, lo que incrementa significativamente el CTR y la conversión. Se espera un aumento del 25% en la interacción y un crecimiento acelerado de la base de datos de clientes.
              </div>
            </div>


          </div>


          {/* Create Task Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
            {/* Task Card */}
            <TaskForm />


            <PromoCard />
            <ChatBot />
          </div>
        </div>
      </div>
    </div>

  )
}

export default DashboardPage;
