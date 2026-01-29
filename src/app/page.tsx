import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import QuoteSection from '@/components/QuoteSection';
import CTA from '@/components/cta';
import Team from '@/components/team';
import PartneringSection from '@/components/partner';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <QuoteSection />
      <CTA/>
      <Team/>
      <PartneringSection/>
      <Footer/>
      {/* Other sections will go here */}
    </main>
  );
}