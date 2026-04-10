import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ShareButtons } from './ShareButtons';

describe('ShareButtons', () => {
    beforeEach(() => {
        // Mock window.location.href to a known value
        vi.stubGlobal('location', { ...window.location, href: 'https://test.com/project-x' });

        // Mock navigator.clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockImplementation(() => Promise.resolve()),
            },
        });

        // Mock requestAnimationFrame for immediate execution in tests
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
            cb(performance.now());
            return 1;
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('renders the share buttons correctly', () => {
        render(<ShareButtons title="Test Project" />);

        expect(screen.getByText('Share Project')).toBeInTheDocument();
        expect(screen.getByTitle('Share on Twitter')).toBeInTheDocument();
        expect(screen.getByTitle('Share on LinkedIn')).toBeInTheDocument();
        expect(screen.getByTitle('Copy Link')).toBeInTheDocument();
    });

    it('generates the correct Twitter share URL', async () => {
        render(<ShareButtons title="Test Project" />);

        const twitterLink = screen.getByTitle('Share on Twitter');

        // We wait for the state to update to capture the URL from window.location.href
        await waitFor(() => {
            const expectedUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out Test Project by Rakibul Hasan Shuvo')}&url=${encodeURIComponent('https://test.com/project-x')}`;
            expect(twitterLink).toHaveAttribute('href', expectedUrl);
        });
    });

    it('generates the correct LinkedIn share URL', async () => {
        render(<ShareButtons title="Test Project" />);

        const linkedinLink = screen.getByTitle('Share on LinkedIn');

        await waitFor(() => {
            const expectedUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://test.com/project-x')}`;
            expect(linkedinLink).toHaveAttribute('href', expectedUrl);
        });
    });
});
