"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold">EmailPro</span>
                        </Link>
                    </div>

                    {/*  menu pc*/}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/servicios" className="text-neutral-700 hover:text-blue-600 font-medium">
                            Servicios
                        </Link>
                        <Link href="/nosotros" className="text-neutral-700 hover:text-blue-600 font-medium">
                            Nosotros
                        </Link>
                        <Link href="/contacto" className="text-neutral-700 hover:text-blue-600 font-medium">
                            Contacto
                        </Link>
                        <Link href="/ingresar" className="text-neutral-700 hover:text-blue-600 font-medium">
                            Ingresar
                        </Link>
                        <Button asChild variant="default">
                            <Link href="/registrarse">Registrarse</Link>
                        </Button>
                    </nav>

                    {/* menu mobile*/}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-blue-600 hover:bg-neutral-100 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Abrir menú</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* para el menu mobile*/}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/servicios"
                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-blue-600 hover:bg-neutral-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Servicios
                        </Link>
                        <Link
                            href="/nosotros"
                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-blue-600 hover:bg-neutral-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/contacto"
                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-blue-600 hover:bg-neutral-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                        <Link
                            href="/ingresar"
                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-blue-600 hover:bg-neutral-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Ingresar
                        </Link>
                        <Link
                            href="/registrarse"
                            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
