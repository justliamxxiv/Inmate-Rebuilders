import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import QuoteSection from '@/components/QuoteSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <QuoteSection />
      {/* Other sections will go here */}
    </main>
  );
}