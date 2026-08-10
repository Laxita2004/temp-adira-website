import "./globals.css";
import { ReactNode } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Providers from "./providers"; 

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata = {
  title: "RATNAWAD",
  description:
    "RATNAWAD brings you graceful chiffon sarees where timeless tradition meets quiet luxury.",
  icons: {
    icon: "/logo/RatnawadLogo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="min-h-screen flex flex-col bg-light">
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
