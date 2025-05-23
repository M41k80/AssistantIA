import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'sonner'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AssistantIA - Tu asistente inteligente todo en uno",
  description:
    "AssistantIA es tu asistente inteligente todo en uno impulsado por IA. Gestiona tareas, automatiza emails, realiza scraping de leads, controla tus gastos y más desde una sola plataforma.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AssistantIA - Tu asistente inteligente todo en uno",
    description:
      "Optimiza tu productividad con AssistantIA: gestión de tareas, emails, scraping de datos, finanzas y más, todo en un solo lugar.",
    url: "https://assistant-ia-ashy.vercel.app", 
    siteName: "AssistantIA",
    images: [
      {
        url: "/assistantia.png", 
        width: 1200,
        height: 630,
        alt: "AssistantIA: vista previa de la app",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssistantIA - Tu asistente todo en uno con IA",
    description:
      "Simplifica tu día a día con IA: tareas, correos, scraping, gastos y más con AssistantIA.",
    images: ["/assistantia-preview.png"],
    creator: "@tuUsuarioTwitter", // opcional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Toaster richColors />
          {children}

        </AuthProvider>
      </body>
    </html>
  );
}




