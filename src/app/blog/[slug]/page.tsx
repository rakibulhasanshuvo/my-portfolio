import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto">
            <Link href="/blog" className="text-white/60 hover:text-white transition-colors mb-8 inline-block">
                &larr; All Posts
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-white/40 font-mono text-sm mb-6">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {post.title}
                </h1>
            </header>

            <article className="prose prose-invert prose-lg max-w-none">
                <div className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed">
                    {/* In a real app, use MDX or react-markdown here */}
                    {post.content}
                </div>
            </article>
        </main>
    );
}
