'use client';

import { motion } from 'framer-motion';

import { profile } from '@/data/profile';
import { useOptimizedMotion } from '@/lib/motion';
import { useContactForm } from '@/hooks/useContactForm';
import { ContactSuccess } from '@/components/contact/ContactSuccess';
import { ContactError } from '@/components/contact/ContactError';
import { ContactForm } from '@/components/contact/ContactForm';

const YOUR_EMAIL = profile.email;

export default function Contact() {
    const { isMobile, shouldReduceMotion, transition } = useOptimizedMotion();
    const { formRef, formState, errorMessage, handleSubmit, resetForm } = useContactForm();

    return (
        <section id="contact" className="py-32 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                layout={!isMobile}
                transition={{ ...transition, duration: 0.6 }}

                viewport={{ once: true }}
                className="text-center mb-16"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                <span className="overline-label">Contact</span>
                <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase italic tracking-tighter">Let&apos;s Connect</h2>
                <p className="text-foreground/60 text-xl mb-8 font-medium">
                    Have a vision? Let&apos;s bring it to life with precision and style.
                </p>
                <a
                    href={`mailto:${YOUR_EMAIL}`}
                    className="text-purple-400 hover:text-purple-300 transition-colors text-lg font-medium"
                >
                    {YOUR_EMAIL}
                </a>
            </motion.div>

            <motion.div
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                layout={!isMobile}
                transition={{ ...transition, duration: 0.6, delay: 0.2 }}

                viewport={{ once: true }}
                className="bg-foreground/5 border border-foreground/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                {formState === 'success' ? (
                    <ContactSuccess
                        shouldReduceMotion={shouldReduceMotion}
                        isMobile={isMobile}
                        transition={transition}
                        resetForm={resetForm}
                    />
                ) : formState === 'error' ? (
                    <ContactError
                        shouldReduceMotion={shouldReduceMotion}
                        isMobile={isMobile}
                        transition={transition}
                        errorMessage={errorMessage}
                        resetForm={resetForm}
                        email={YOUR_EMAIL}
                    />
                ) : (
                    <ContactForm
                        formRef={formRef}
                        handleSubmit={handleSubmit}
                        formState={formState}
                    />
                )}
            </motion.div>
        </section>
    );
}
