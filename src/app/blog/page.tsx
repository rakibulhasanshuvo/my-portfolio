import { blogPosts } from '@/data/blog';
import Link from 'next/link';

export const metadata = {
    title: 'Blog',
    description: 'Thoughts on design, code, and the vibe.',
};

export default function BlogIndex() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <header className="mb-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                    Insights
                </h1>
                <p className="text-xl text-white/60">
                    Thoughts on development, design, and the digital vibe.
                </p>
            </header>

            <div className="grid gap-12">
                {blogPosts.map((post) => (
                    <article key={post.id} className="group border-b border-white/10 pb-12">
                        <Link href={`/blog/${post.slug}`} className="block">
                            <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-4">
                                <h2 className="text-3xl font-bold group-hover:text-purple-400 transition-colors">
                                    {post.title}
                                </h2>
                                <span className="text-white/40 font-mono text-sm">{post.date}</span>
                            </div>
                            <p className="text-white/70 text-lg leading-relaxed mb-4 max-w-2xl">
                                {post.excerpt}
                            </p>
                            <span className="text-purple-400 text-sm font-medium group-hover:underline">
                                Read Article &rarr;
                            </span>
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}
