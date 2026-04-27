import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Te Lo Resuelvo Viajes | Agencia de viajes en Italia",
  description: "Tu agencia de viajes de confianza en Italia. Vuelos, paquetes turísticos, cruceros y asistencia personalizada.",
  openGraph: {
    title: "Te Lo Resuelvo Viajes",
    description: "Tu agencia de viajes de confianza en Italia.",
    siteName: "Te Lo Resuelvo Viajes",
    type: "website",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
