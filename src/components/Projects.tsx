'use client';

import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';

import { useOptimizedMotion } from '@/lib/motion';
import { projects, categories } from '@/lib/constants';

import Link from 'next/link';
import Image from 'next/image';

function Card({ project }: { project: typeof projects[0] }) {
    const { isMobile, shouldReduceMotion } = useOptimizedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            layout={!isMobile}
            initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.9 })}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            exit={isMobile ? { opacity: 0, transitionEnd: { display: "none" } } : { opacity: 0, scale: 0.9, transitionEnd: { display: "none" } }}
            transition={{ duration: 0.3 }}
            className="group relative border border-foreground/10 rounded-2xl bg-card overflow-hidden flex flex-col h-full"
            onMouseMove={isMobile ? undefined : handleMouseMove}
            whileHover={isMobile ? undefined : { y: -5 }}
            style={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
        >
            {/* Project Image/Video Preview */}
            <div className="relative h-48 w-full overflow-hidden bg-foreground/5">
                {project.image && (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                {project.video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="text-foreground fill-foreground" size={32} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>

            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 50, 255, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative z-10 flex-grow px-8 py-6">
                <span className="overline-label !text-[9px] !mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold mb-3 text-foreground uppercase italic tracking-tight">{project.title}</h3>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-foreground/5 border border-foreground/5 text-foreground/40">
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 text-foreground/30">+{project.tags.length - 3} more</span>
                    )}
                </div>
            </div>

            <div className="relative z-10 flex gap-4 mt-auto px-8 pb-8 pt-4 border-t border-foreground/5">
                <Link
                    href={`/work/${project.id}`}
                    className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors mr-auto"
                >
                    Case Study &rarr;
                </Link>
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/40 hover:text-foreground transition-colors"
                    title="Live Demo"
                >
                    <ExternalLink size={18} />
                </a>
                <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/40 hover:text-foreground transition-colors"
                    title="Source Code"
                >
                    <Github size={18} />
                </a>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const { isMobile, shouldReduceMotion, transition } = useOptimizedMotion();

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="work" className="py-20 mt-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-16">
                <motion.span
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition }}

                    viewport={{ once: true }}
                    className="overline-label"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    Portfolio
                </motion.span>
                <motion.h2
                    initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { opacity: 0, y: 20 })}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}

                    layout={!isMobile}
                    transition={{ ...transition, duration: isMobile ? transition.duration : 0.6, delay: 0.1 }}

                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold mb-10 text-center uppercase italic tracking-tighter"
                    style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                >
                    Selected Works
                </motion.h2>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 bg-foreground/5 p-1.5 rounded-full border border-foreground/5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${filter === cat ? 'text-background' : 'text-foreground/50 hover:text-foreground/80'
                                }`}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    layout={!isMobile}
                                    className="absolute inset-0 bg-purple-600 rounded-full -z-10"
                                    transition={isMobile ? { type: 'tween', duration: 0.3 } : { type: 'spring', duration: 0.5 }}
                                />
                            )}
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout={!isMobile}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <Card key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
