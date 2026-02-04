'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent, useRef } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ⚠️ IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // e.g., 'AbCdEfGhIjKlMnOp'

import { profile } from '@/data/profile';

const YOUR_EMAIL = profile.email;

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
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            // Fallback to mailto if EmailJS not configured
            const formData = new FormData(formRef.current);
            const name = formData.get('user_name') as string;
            const email = formData.get('user_email') as string;
            const message = formData.get('message') as string;

            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
            setFormState('success');
            return;
        }

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
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
                <h2 className="text-4xl font-bold mb-6">Let&apos;s Work Together</h2>
                <p className="text-white/60 text-lg mb-4">
                    Have a project in mind? Let&apos;s build something extraordinary.
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
                className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
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
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-white/60">I&apos;ll get back to you as soon as possible.</p>
                        <button
                            onClick={resetForm}
                            className="mt-8 text-sm text-white/40 hover:text-white transition-colors"
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
                        <h3 className="text-2xl font-bold mb-2">Something Went Wrong</h3>
                        <p className="text-white/60 mb-4">{errorMessage}</p>
                        <a
                            href={`mailto:${YOUR_EMAIL}`}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Email me directly
                        </a>
                        <button
                            onClick={resetForm}
                            className="mt-4 text-sm text-white/40 hover:text-white transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="user_name" className="text-sm font-medium text-white/60 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="user_email" className="text-sm font-medium text-white/60 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    required
                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-white/60 ml-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formState === 'submitting'}
                            className="mt-2 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
