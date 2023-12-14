import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import SessionAuthProvider from "@/context/SessionAuthProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZONA SANITARIA III",
  description: "Zona Sanitaria app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen flex flex-col justify-center items-center">
            <SessionAuthProvider>
              <Navbar />
              {children}
            </SessionAuthProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
