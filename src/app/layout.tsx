import type { Metadata } from 'next';
import { Raleway, Prata } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

// Configure fonts
const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const prata = Prata({
  subsets: ['latin'],
  variable: '--font-prata',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Inmate Rebuilders - Beyond Bars, Breaking Boundaries',
  description: 'Empowering individuals to break free from their past and build brighter futures',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${prata.variable}`}>
      <body className="font-sans bg-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
