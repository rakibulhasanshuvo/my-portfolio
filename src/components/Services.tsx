'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp } from 'lucide-react';

import { profile } from '@/data/profile';

const iconMap = {
    Code2,
    Palette,
    TrendingUp
};

const services = profile.services;

export default function Services() {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-16 text-center"
            >
                What I Do
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl bg-foreground/5 border border-foreground/5 backdrop-blur-sm hover:bg-foreground/10 transition-colors"
                    >
                        <div className="mb-6 p-4 rounded-full bg-foreground/5 w-fit">
                            {(() => {
                                const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2;
                                const colors = ["text-purple-400", "text-blue-400", "text-pink-400"];
                                const color = colors[index % colors.length];
                                return <Icon size={32} className={color} />;
                            })()}
                        </div>
                        <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                        <p className="text-foreground/60 leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
