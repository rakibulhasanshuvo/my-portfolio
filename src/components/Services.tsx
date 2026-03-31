'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp } from 'lucide-react';

import { profile } from '@/data/profile';
import { useOptimizedMotion } from '@/lib/motion';

const iconMap = {
    Code2,
    Palette,
    TrendingUp
};

const services = profile.services;

export default function Services() {
    const { isMobile, shouldReduceMotion, transition } = useOptimizedMotion();

    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <motion.span
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition }}

                    viewport={{ once: true }}
                    className="overline-label"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    Expertise
                </motion.span>
                <motion.h2
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition, duration: isMobile ? transition.duration : 0.6, delay: 0.1 }}

                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    Solutions & Services
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                        layout={!isMobile}
                        transition={{ ...transition, duration: isMobile ? transition.duration : 0.5, delay: index * 0.1 }}

                        viewport={{ once: true }}
                        whileHover={isMobile ? undefined : { y: -5 }}
                        className="p-8 rounded-2xl bg-foreground/5 border border-foreground/5 backdrop-blur-sm hover:bg-foreground/10 transition-colors"
                        style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                    >
                        <div className="mb-6 p-4 rounded-full bg-foreground/5 w-fit">
                            {(() => {
                                const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2;
                                const colors = ["text-purple-400", "text-blue-400", "text-pink-400"];
                                const color = colors[index % colors.length];
                                return <Icon size={32} className={color} />;
                            })()}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase italic tracking-tight">{service.title}</h3>
                        <p className="text-foreground/60 leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
