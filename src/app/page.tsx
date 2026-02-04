import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TechStack />
      <Projects />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
