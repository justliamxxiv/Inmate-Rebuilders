// app/donate/layout.tsx
import Navbar from '@/components/Navbar';

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
