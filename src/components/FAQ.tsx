'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { profile } from '@/data/profile';

const faqs = profile.faqs;

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-4 block">Got Questions?</span>
                    <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-white/5 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors group"
                            >
                                <span className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    {activeIndex === index ? (
                                        <Minus className="text-purple-500" size={20} />
                                    ) : (
                                        <Plus className="text-white/40 group-hover:text-purple-500" size={20} />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
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
