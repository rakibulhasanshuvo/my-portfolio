import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DigitalNetwork from '@/components/ui/DigitalNetwork';
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('@/components/Projects'), { ssr: true });
const Services = dynamic(() => import('@/components/Services'), { ssr: true });
const About = dynamic(() => import('@/components/About'), { ssr: true });
const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: true });
const Workflow = dynamic(() => import('@/components/Workflow'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <DigitalNetwork />

      <div className="relative isolate">
        <TechStack />
        <About />
        <Services />
        <Workflow />
        <Projects />
        <Experience />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
