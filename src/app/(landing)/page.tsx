import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import QuoteSection from '@/components/QuoteSection';
import CTA from '@/components/cta';
import Team from '@/components/team';
import PartneringSection from '@/components/partner';
import Footer from '@/components/footer';
import Portfolio from '@/components/portfolio';
import Divider from '@/components/divider';

export default function Landing() {
  return (
    <main>
      <Hero />
      <Divider/>
      <AboutUs />
      <QuoteSection />
      <CTA/>
      <Team/>
      <PartneringSection/>
      <Divider/>
      <Portfolio/>
      <Divider/>
      
    </main>
  );
}
