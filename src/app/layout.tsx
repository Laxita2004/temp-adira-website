import "./globals.css";
import { ReactNode } from "react";
import { Cormorant_Garamond } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata = {
  title: "Adira | The House of Chiffon",
  description: "Luxury Handcrafted Chiffon Sarees and Rajputi Poshaks.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return ( 
    <html lang="en" className={cormorant.variable}>
      <body className="min-h-screen flex flex-col">
        {/* Your Header */}
        <Header />

        {/* Main content grows to fill remaining space */}
        <main className="flex-1">{children}</main>

        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  );
}
