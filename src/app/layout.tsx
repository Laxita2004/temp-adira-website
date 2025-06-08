import "./globals.css";
import { ReactNode } from "react";
import { Cormorant_Garamond } from 'next/font/google';

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
      <body className="bg-light text-gray-900 font-serif">
        {children}
      </body>
    </html>
  );
}
