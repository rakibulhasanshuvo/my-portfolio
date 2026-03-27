import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { profile } from '@/data/profile';
import { blogPosts } from '@/data/blog';

describe('sitemap', () => {
    it('should generate a valid sitemap', () => {
        const result = sitemap();

        // Ensure it returns an array
        expect(Array.isArray(result)).toBe(true);

        // We expect:
        // 1 (home) + 1 (blog index) + projects length + blogs length
        const expectedLength = 2 + profile.projects.length + blogPosts.length;
        expect(result.length).toBe(expectedLength);

        // Verify Home URL
        const homeUrl = result.find(item => item.url === 'https://rakibul.dev');
        expect(homeUrl).toBeDefined();
        expect(homeUrl).toEqual({
            url: 'https://rakibul.dev',
            lastModified: expect.any(Date),
            changeFrequency: 'yearly',
            priority: 1,
        });

        // Verify Blog Index URL
        const blogIndexUrl = result.find(item => item.url === 'https://rakibul.dev/blog');
        expect(blogIndexUrl).toBeDefined();
        expect(blogIndexUrl).toEqual({
            url: 'https://rakibul.dev/blog',
            lastModified: expect.any(Date),
            changeFrequency: 'weekly',
            priority: 0.8,
        });

        // Verify Project URLs
        profile.projects.forEach(project => {
            const projectUrl = result.find(item => item.url === `https://rakibul.dev/work/${project.id}`);
            expect(projectUrl).toBeDefined();
            expect(projectUrl).toEqual({
                url: `https://rakibul.dev/work/${project.id}`,
                lastModified: expect.any(Date),
                changeFrequency: 'monthly',
                priority: 0.8,
            });
        });

        // Verify Blog URLs
        blogPosts.forEach(post => {
            const blogUrl = result.find(item => item.url === `https://rakibul.dev/blog/${post.slug}`);
            expect(blogUrl).toBeDefined();
            expect(blogUrl).toEqual({
                url: `https://rakibul.dev/blog/${post.slug}`,
                lastModified: expect.any(Date),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    });
});
