'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent, useRef } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration using environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

import { profile } from '@/data/profile';

const YOUR_EMAIL = profile.email;

async function handleMailtoFallback(form: HTMLFormElement): Promise<void> {
    const formData = new FormData(form);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
}

async function handleEmailJSSubmit(form: HTMLFormElement): Promise<void> {
    await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        {
            publicKey: EMAILJS_PUBLIC_KEY,
        }
    );
}

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!formRef.current) return;

        setFormState('submitting');
        setErrorMessage('');

        // Check if EmailJS is configured
        const isEmailJSConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

        try {
            if (!isEmailJSConfigured) {
                // Fallback to mailto if EmailJS not configured
                await handleMailtoFallback(formRef.current);
            } else {
                await handleEmailJSSubmit(formRef.current);
            }
            setFormState('success');
        } catch (error) {
            console.error('EmailJS Error:', error);
            setErrorMessage('Failed to send message. Please try again or email directly.');
            setFormState('error');
        }
    }

    function resetForm() {
        setFormState('idle');
        setErrorMessage('');
        formRef.current?.reset();
    }

    return (
        <section id="contact" className="py-32 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-foreground/5 border border-foreground/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
            >
                {formState === 'success' ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-500/20 p-4 rounded-full text-green-400 mb-6"
                        >
                            <CheckCircle size={48} />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
                        <p className="text-foreground/60">I&apos;ll get back to you as soon as possible.</p>
                        <button
                            onClick={resetForm}
                            className="mt-8 text-sm text-foreground/40 hover:text-foreground transition-colors"
                        >
                            Send another message
                        </button>
                    </div>
                ) : formState === 'error' ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-red-500/20 p-4 rounded-full text-red-400 mb-6"
                        >
                            <AlertCircle size={48} />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 text-foreground">Something Went Wrong</h3>
                        <p className="text-foreground/60 mb-4">{errorMessage}</p>
                        <a
                            href={`mailto:${YOUR_EMAIL}`}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Email me directly
                        </a>
                        <button
                            onClick={resetForm}
                            className="mt-4 text-sm text-foreground/40 hover:text-foreground transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="user_name" className="text-sm font-medium text-foreground/60 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="user_email" className="text-sm font-medium text-foreground/60 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    required
                                    className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground/60 ml-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formState === 'submitting'}
                            className="mt-2 bg-foreground text-background font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formState === 'submitting' ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </motion.div>
        </section>
    );
}
