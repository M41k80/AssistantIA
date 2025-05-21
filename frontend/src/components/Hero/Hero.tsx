import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg">
      <Navbar />

      
      <section className="bg-gradient-to-b from-neutral-300 to-neutral-100 rounded-b-[150px] py-20 px-4 text-center ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Un asistente. Todas tus soluciones.
            <br />
            Impulsá tu negocio con IA.
          </h1>
          <Button size="lg" className="px-8 py-6 text-lg rounded-md">
            Comencemos
          </Button>
        </div>
      </section>

      
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl mx-auto">
          Organizá tu día con inteligencia
          <br />y simplificá tu trabajo real
        </h2>
      </section>

      
      <section className="py-8 px-4">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-white px-6 py-2 rounded-full shadow-md rotate-3 relative z-10">
              <span className="text-lg font-medium">Servicios</span>
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-neutral-100 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
              <h3 className="font-bold mb-2">Email Marketing con IA</h3>
              <p className="text-sm text-neutral-600">
                Creá campañas en segundos con IA. Solo decí qué querés comunicar y listo.
              </p>
            </div>

            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-neutral-100 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
              <h3 className="font-bold mb-2">Gestión de Tareas Inteligente</h3>
              <p className="text-sm text-neutral-600">
                Organizá tus tareas de forma simple. La IA prioriza lo importante por vos.
              </p>
            </div>

            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-neutral-100 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Control de Gastos</h3>
              <p className="text-sm text-neutral-600">
                Visualizá ingresos, egresos y porcentajes. Recibí consejos para ahorrar mejor.
              </p>
            </div>

            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-neutral-100 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2">Scraping de Leads (Pro)</h3>
              <p className="text-sm text-neutral-600">
                Encontrá carreras de potenciales clientes. Segmentá y cuadrá en tus campañas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-grow"></div>

      <Footer />
    </div>
  )
}
