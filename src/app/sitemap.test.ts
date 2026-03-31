import { expect, test, describe } from 'vitest';
import sitemap from './sitemap';
import { projects } from '@/lib/constants';
import { blogPosts } from '@/data/blog';

describe('sitemap', () => {
    test('should generate the correct number of URLs', () => {
        const result = sitemap();
        const expectedLength = 2 + projects.length + blogPosts.length;
        expect(result).toHaveLength(expectedLength);
    });

    test('should include standard static routes', () => {
        const result = sitemap();

        const homeRoute = result.find(route => route.url === 'https://rakibul.dev');
        expect(homeRoute).toBeDefined();
        expect(homeRoute).toEqual({
            url: 'https://rakibul.dev',
            lastModified: expect.any(Date),
            changeFrequency: 'yearly',
            priority: 1,
        });

        const blogRoute = result.find(route => route.url === 'https://rakibul.dev/blog');
        expect(blogRoute).toBeDefined();
        expect(blogRoute).toEqual({
            url: 'https://rakibul.dev/blog',
            lastModified: expect.any(Date),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    test('should include dynamic project routes', () => {
        const result = sitemap();

        for (const project of projects) {
            const projectRoute = result.find(route => route.url === `https://rakibul.dev/work/${project.id}`);
            expect(projectRoute).toBeDefined();
            expect(projectRoute).toEqual({
                url: `https://rakibul.dev/work/${project.id}`,
                lastModified: expect.any(Date),
                changeFrequency: 'monthly',
                priority: 0.8,
            });
        }
    });

    test('should include dynamic blog routes', () => {
        const result = sitemap();

        for (const post of blogPosts) {
            const blogRoute = result.find(route => route.url === `https://rakibul.dev/blog/${post.slug}`);
            expect(blogRoute).toBeDefined();
            expect(blogRoute).toEqual({
                url: `https://rakibul.dev/blog/${post.slug}`,
                lastModified: expect.any(Date),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        }
    });
});
