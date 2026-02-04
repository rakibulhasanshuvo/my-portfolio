import { profile } from '@/data/profile';
const projects = profile.projects;
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.id === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <Link href="/#work" className="text-white/60 hover:text-white transition-colors mb-8 inline-block">
                &larr; Back to Work
            </Link>

            <header className="mb-16">
                <div className="flex gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-purple-400">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                    {project.title}
                </h1>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                    {project.description}
                </p>

                <div className="flex gap-4 mt-8">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        Live Demo
                    </a>
                    <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors"
                    >
                        Source Code
                    </a>
                </div>
            </header>

            <article className="prose prose-invert prose-lg max-w-none">
                <div className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed">
                    {/* In a real app, use MDX or react-markdown here */}
                    {project.content}
                </div>
            </article>
        </main>
    );
}
