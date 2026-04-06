import { projects, projectMap } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ProjectHeader } from '@/components/work/ProjectHeader';
import { ProjectMedia } from '@/components/work/ProjectMedia';
import { ProjectGallery } from '@/components/work/ProjectGallery';
import { ProjectContent } from '@/components/work/ProjectContent';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projectMap[slug];
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
    const project = projectMap[slug];

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
                    <ProjectHeader project={project} />

                    <div className="space-y-8">
                        <ProjectMedia project={project} />

                        <article className="prose prose-invert prose-lg max-w-none bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                            <div className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed">
                                {project.content}
                            </div>
                        </article>

                        <ProjectGallery project={project} />
                        <ProjectContent project={project} />
                    </div>
                </div>
            </div>
        </main>
    );
}
