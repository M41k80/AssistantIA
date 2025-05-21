import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/terminos" className="text-white hover:text-blue-100">
                            Términos y condiciones
                        </Link>
                    </div>
                    <div>
                        <Link href="/contacto" className="text-white hover:text-blue-100">
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
