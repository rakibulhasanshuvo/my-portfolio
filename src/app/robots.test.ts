import { describe, it, expect } from 'vitest';
import robots from './robots';

describe('robots.txt generation', () => {
    it('should generate the correct robots.txt configuration', () => {
        const expectedRobots = {
            rules: {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            sitemap: 'https://rakibul.dev/sitemap.xml',
        };

        const result = robots();

        expect(result).toEqual(expectedRobots);
    });
});
