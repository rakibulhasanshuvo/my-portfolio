import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { profile } from '@/data/profile';
import { blogPosts } from '@/data/blog';

describe('sitemap', () => {
    it('generates the correct sitemap URLs and metadata', () => {
        const generatedSitemap = sitemap();
        const baseUrl = 'https://rakibul.dev';

        // Check base structure
        expect(Array.isArray(generatedSitemap)).toBe(true);

        // Define expected URLs
        const expectedBaseRoutes = [
            { url: baseUrl, changeFrequency: 'yearly', priority: 1 },
            { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
        ];

        const expectedProjectRoutes = profile.projects.map((project) => ({
            url: `${baseUrl}/work/${project.id}`,
            changeFrequency: 'monthly',
            priority: 0.8,
        }));

        const expectedBlogRoutes = blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        const totalExpectedCount = expectedBaseRoutes.length + expectedProjectRoutes.length + expectedBlogRoutes.length;

        // Verify length dynamically matches data
        expect(generatedSitemap).toHaveLength(totalExpectedCount);

        // Helper to check standard properties of a sitemap entry
        const verifyEntry = (
            entry: any,
            expectedUrl: string,
            expectedChangeFreq: string,
            expectedPriority: number
        ) => {
            expect(entry).toBeDefined();
            expect(entry.url).toBe(expectedUrl);
            expect(entry.changeFrequency).toBe(expectedChangeFreq);
            expect(entry.priority).toBe(expectedPriority);
            expect(entry.lastModified).toBeInstanceOf(Date);
        };

        // Check base routes
        verifyEntry(generatedSitemap[0], expectedBaseRoutes[0].url, expectedBaseRoutes[0].changeFrequency, expectedBaseRoutes[0].priority);
        verifyEntry(generatedSitemap[1], expectedBaseRoutes[1].url, expectedBaseRoutes[1].changeFrequency, expectedBaseRoutes[1].priority);

        // Check project routes (offset by 2 base routes)
        profile.projects.forEach((project, index) => {
            const entryIndex = index + 2;
            const entry = generatedSitemap[entryIndex];
            verifyEntry(entry, expectedProjectRoutes[index].url, expectedProjectRoutes[index].changeFrequency, expectedProjectRoutes[index].priority);
        });

        // Check blog routes (offset by 2 base routes + projects.length)
        blogPosts.forEach((post, index) => {
            const entryIndex = index + 2 + profile.projects.length;
            const entry = generatedSitemap[entryIndex];
            verifyEntry(entry, expectedBlogRoutes[index].url, expectedBlogRoutes[index].changeFrequency, expectedBlogRoutes[index].priority);
        });
    });
});
