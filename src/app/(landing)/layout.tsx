// app/donate/layout.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
