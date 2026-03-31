'use client';

import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import Image from 'next/image';
import { profile } from '@/data/profile';

export default function About() {
    return (
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Photo Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden border border-foreground/10 relative group">
                        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-background/60">
                            <span className="text-foreground font-medium">Rakibul Hasan Shuvo</span>
                        </div>
                        <Image
                            src="/rakibul.jpeg"
                            alt="Rakibul Hasan Shuvo"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Location Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-6 left-8 px-4 py-2 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full flex items-center gap-2"
                    >
                        <MapPin size={16} className="text-purple-400" />
                        <span className="text-sm text-foreground/70">Bangladesh</span>
                    </motion.div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="overline-label">The Story</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tighter uppercase italic">
                        {profile.about.title}
                    </h2>
                    <div className="space-y-6 text-foreground/60 text-lg leading-relaxed mb-10">
                        {profile.about.description.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mb-12">
                        {profile.about.stats.map((stat, i) => (
                            <div key={i}>
                                <span className="text-4xl font-bold text-foreground">{stat.value}</span>
                                <p className="overline-label !mb-0 !mt-2 !text-[10px]">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-full hover:opacity-90 transition-opacity"
                    >
                        <Download size={18} />
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
