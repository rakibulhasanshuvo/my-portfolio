'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { profile } from '@/data/profile';
import { useOptimizedMotion } from '@/lib/motion';

const faqs = profile.faqs;

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { isMobile, shouldReduceMotion, transition } = useOptimizedMotion();

    return (
        <section className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition, duration: isMobile ? transition.duration : 0.6 }}

                    viewport={{ once: true }}
                    className="text-center mb-16"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    <span className="overline-label">Got Questions?</span>
                    <h2 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter">Insights</h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                            layout={!isMobile}
                            transition={{ ...transition, duration: isMobile ? transition.duration : 0.5, delay: index * 0.1 }}

                            viewport={{ once: true }}
                            className="border border-foreground/5 rounded-2xl overflow-hidden bg-foreground/5 backdrop-blur-sm"
                            style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-foreground/5 transition-colors group"
                            >
                                <span className="font-semibold text-lg text-foreground group-hover:text-purple-400 transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    {activeIndex === index ? (
                                        <Minus className="text-purple-500" size={20} />
                                    ) : (
                                        <Plus className="text-foreground/40 group-hover:text-purple-500" size={20} />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { height: 0, opacity: 0 })}
                                        animate={shouldReduceMotion ? undefined : (isMobile ? { opacity: 1 } : { height: 'auto', opacity: 1 })}
                                        exit={isMobile ? { opacity: 0, transitionEnd: { display: "none" } } : { height: 0, opacity: 0, transitionEnd: { display: "none" } }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        layout={!isMobile}
                                        style={shouldReduceMotion ? { opacity: 1, height: 'auto' } : undefined}
                                    >
                                        <div className="px-6 pb-6 text-foreground/60 leading-relaxed border-t border-foreground/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
