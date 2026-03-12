import { profile } from '@/data/profile';
const projects = profile.projects;
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ExternalLink, Github } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);
    if (!project) return {};

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [project.image] : [],
        },
    };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/#work" className="text-white/40 hover:text-white transition-colors mb-12 inline-flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Work
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <header>
                        <div className="flex gap-2 mb-6">
                            <span className="text-xs font-bold text-purple-400 tracking-widest uppercase py-1 px-3 rounded-full bg-purple-400/10 border border-purple-400/20">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <ExternalLink size={20} /> Live Demo
                            </a>
                            <a
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <Github size={20} /> Source Code
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm text-white/80">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Role</h4>
                                <p className="text-sm text-white/80">Lead Developer & Designer</p>
                            </div>
                        </div>
                    </header>

                    <div className="space-y-8">
                        {project.video ? (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <video
                                    src={project.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : project.image ? (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : null}

                        <article className="prose prose-invert prose-lg max-w-none bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                            <div className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed">
                                {project.content}
                            </div>
                        </article>

                        {project.gallery && (
                            <div className="grid grid-cols-2 gap-4">
                                {project.gallery.map((img, i) => (
                                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                        <Image
                                            src={img}
                                            alt={`${project.title} gallery ${i}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
