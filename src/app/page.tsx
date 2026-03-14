import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Workflow from '@/components/Workflow';
import Experience from '@/components/Experience';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TechStack />
      <About />
      <Services />
      <Workflow />
      <Projects />
      <Experience />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
