'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import { profile } from '@/data/profile';

const testimonials = profile.testimonials;

export default function Testimonials() {
    return (
        <section className="py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="overline-label">Client Voices</span>
                    <h2 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter">Collaborations</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="bg-foreground/5 border border-foreground/5 rounded-3xl p-8 backdrop-blur-sm relative"
                        >
                            <Quote size={32} className="text-purple-500/30 mb-6" />

                            <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                                &quot;{testimonial.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm text-white">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-foreground/40 text-sm">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
