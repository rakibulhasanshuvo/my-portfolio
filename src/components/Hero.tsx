'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AuroraBackground from './ui/AuroraBackground';
import HeroHeading from './ui/HeroHeading';
import HeroSkillMarquee from './ui/HeroSkillMarquee';
import { profile } from '@/data/profile';
import { useMobile } from '@/hooks/useMobile';
import { useDeferredSplineMount } from '@/hooks/useDeferredSplineMount';
import { duplicatedSkills } from '@/lib/constants';
import { useOptimizedMotion } from '@/lib/motion';

const SplineScene = dynamic(() => import('./ui/SplineScene'), {
    ssr: false,
});

export default function Hero() {
    const { shouldReduceMotion } = useOptimizedMotion();
    // Default to true during SSR to prevent heavy 3D loading before hydration on mobile.
    // This might cause a hydration mismatch if loaded on desktop, but the visual pop-in
    // is better than a 20s lockup on mobile.
    const isMobile = useMobile(1024, true);
    const { mountSpline, handleSplineLoad } = useDeferredSplineMount();
    const words = "Rakibul Hasan Shuvo".split(" ");

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden pt-32 animate-entry">

            <AuroraBackground />

            {/* 3D Spline Design - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
                {!isMobile && mountSpline && (
                    <SplineScene
                        scene="https://prod.spline.design/qF9apOu8tJv1sgOk/scene.splinecode"
                        onLoad={handleSplineLoad}
                        className="w-full h-full"
                    />
                )}
            </div>

            {/* Mobile Static Fallback */}
            <div className="absolute inset-0 z-0 pointer-events-none block lg:hidden bg-gradient-to-b from-purple-900/20 via-background to-background" />

            {/* Overline label */}
            <motion.span
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="overline-label z-10"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                Digital Architect & Developer
            </motion.span>

            {/* Main Heading */}
            <HeroHeading words={words} shouldReduceMotion={shouldReduceMotion} isMobile={isMobile} />

            {/* Subtext */}
            <motion.p
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-2xl text-foreground/60 mb-16 text-center max-w-3xl px-6 z-10 font-medium leading-relaxed"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                {profile.hero.tagline}
            </motion.p>

            {/* Floating Skill Tags & Infinite Marquee */}
            <HeroSkillMarquee skills={duplicatedSkills} shouldReduceMotion={shouldReduceMotion} isMobile={isMobile} />

        </section>
    );
}
