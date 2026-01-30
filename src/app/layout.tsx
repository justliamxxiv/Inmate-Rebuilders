// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Nunito } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Inmate Rebuilders - Beyond Bars, Breaking Boundaries',
  description: 'Empowering individuals to break free from their past and build brighter futures',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.className} ${nunito.variable}`}>
      <body className="font-sans bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
