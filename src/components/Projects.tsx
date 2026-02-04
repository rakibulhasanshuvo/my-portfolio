'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import { ExternalLink, Github } from 'lucide-react';

import { profile } from '@/data/profile';
const projects = profile.projects;
import Link from 'next/link';

function Card({ project }: { project: typeof projects[0] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative border border-white/10 rounded-2xl bg-[#111] px-8 py-10 overflow-hidden flex flex-col h-full"
            onMouseMove={handleMouseMove}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 50, 255, 0.1),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative z-10 flex-grow">
                <span className="text-xs font-bold text-purple-400 mb-2 block tracking-wider uppercase">{project.category}</span>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-white/50">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex gap-4 mt-auto pt-6 border-t border-white/5">
                <Link
                    href={`/work/${project.id}`}
                    className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors mr-auto"
                >
                    Case Study &rarr;
                </Link>
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-400 transition-colors"
                >
                    <ExternalLink size={16} /> Live Demo
                </a>
                <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                    <Github size={16} /> Source Code
                </a>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="work" className="py-20 mt-40 px-6 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-16 text-center"
            >
                Selected Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full"
                    >
                        <Card project={project} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
