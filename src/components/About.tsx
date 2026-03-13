'use client';

import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import Image from 'next/image';

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
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-4 block">About Me</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Crafting Digital Experiences with Passion
                    </h2>
                    <div className="space-y-4 text-foreground/60 leading-relaxed mb-8">
                        <p>
                            I&apos;m Rakibul Hasan Shuvo, a multidisciplinary creative developer based in Bangladesh.
                            I specialize in building premium digital experiences that blend clean code with intuitive design.
                        </p>
                        <p>
                            My journey started with a curiosity for how things work on the web. Today, I transform
                            that curiosity into impactful products—from sleek portfolios to complex web applications.
                        </p>
                        <p>
                            When I&apos;m not coding, you&apos;ll find me exploring cybersecurity, creating motion graphics,
                            or vibing to new music. I believe the best work comes from passion and flow.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div>
                            <span className="text-3xl font-bold text-foreground">3+</span>
                            <p className="text-foreground/40 text-sm mt-1">Years Experience</p>
                        </div>
                        <div>
                            <span className="text-3xl font-bold text-foreground">20+</span>
                            <p className="text-foreground/40 text-sm mt-1">Projects Completed</p>
                        </div>
                        <div>
                            <span className="text-3xl font-bold text-foreground">15+</span>
                            <p className="text-foreground/40 text-sm mt-1">Happy Clients</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="/resume.pdf"
                        target="_blank"
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
