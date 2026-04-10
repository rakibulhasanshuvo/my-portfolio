'use client';

import { motion } from 'framer-motion';
import AuroraBackground from './ui/AuroraBackground';
import { profile } from '@/data/profile';
import { useOptimizedMotion } from '@/lib/motion';
import HeroSpline from './hero/HeroSpline';
import HeroHeading from './hero/HeroHeading';
import HeroSkills from './hero/HeroSkills';

export default function Hero() {
    const { shouldReduceMotion } = useOptimizedMotion();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden pt-32 animate-entry">

            <AuroraBackground />

            <HeroSpline />

            {/* Overline label */}
            <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="overline-label z-10"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                Digital Architect & Developer
            </motion.span>

            <HeroHeading />

            {/* Subtext */}
            <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-2xl text-foreground/60 mb-16 text-center max-w-3xl px-6 z-10 font-medium leading-relaxed"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                {profile.hero.tagline}
            </motion.p>

            <HeroSkills />

        </section>
    );
}
