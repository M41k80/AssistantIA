import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />


      <section className="bg-gradient-to-b from-gray-400 to-gray-100 rounded-b-[80px] py-30 px-6 text-center shadow-inner">
        <div className="max-w-5xl mx-auto py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-12 leading-tight tracking-tight text-gray-900">
            Un asistente. Todas las soluciones.
            <br />
            <span className="text-gray-900">Impulsá tu negocio con IA.</span>
          </h1>
          <Button
            size="lg"
            className="px-10 py-6 text-xl rounded-xl shadow-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300 ease-in-out"
          ><strong>
              🚀 Comencemos
            </strong>

          </Button>
        </div>
      </section>



      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl mx-auto text-gray-800">
          Organizá tu día con inteligencia
          <br />y simplificá tu trabajo real
        </h2>
      </section>


      <section className="py-24 px-6 bg-white">
        <div className="relative max-w-7xl mx-auto">

          <div className="flex items-center justify-center mb-20 relative">
            <div className="bg-blue-100 text-blue-800 px-6 py-2 rounded-full shadow-md relative z-10 text-lg font-semibold tracking-wide -rotate-12">
              Servicios
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-200 z-0"></div>
          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {[
              {
                title: "Email Marketing con IA",
                desc: "Creá campañas en segundos con IA. Solo escribe lo que quieres comunicar y listo.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
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
                ),
              },
              {
                title: "Gestión de Tareas Inteligente",
                desc: "Organizá tus tareas de forma simple. La IA prioriza lo importante por vos.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
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
                ),
              },
              {
                title: "Control de Gastos",
                desc: "Visualizá ingresos, egresos y porcentajes. Recibí consejos para ahorrar mejor.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
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
                ),
              },
              {
                title: "Scraping de Leads (Pro)",
                desc: "Encontrá carreras de potenciales clientes. Segmentá y cuadrá en tus campañas.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-600"
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
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-full shadow">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <div className="flex-grow"></div>

      <Footer />
    </div>
  )
}
