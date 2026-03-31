import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import emailjs from '@emailjs/browser';

// Mock Framer Motion to avoid animation issues and console warnings
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual as any,
        motion: {
            div: ({ children, whileInView, initial, animate, viewport, transition, transitionEnd, layout, ...props }: any) => <div {...props}>{children}</div>,
        },
    };
});

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
    default: {
        sendForm: vi.fn(),
    },
}));

// Provide a mock profile to ensure we have a known email
vi.mock('@/data/profile', () => ({
    profile: {
        email: 'test@example.com',
    },
}));

describe('Contact', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        // Reset DOM and mocks
        vi.clearAllMocks();

        // Mock window.location for mailto tests
        delete (window as any).location;
        window.location = { ...originalLocation, href: 'http://localhost' };

        // Ensure intersection observer is mocked globally for framer-motion whileInView
        const mockIntersectionObserver = vi.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    afterEach(() => {
        window.location = originalLocation;
        vi.unstubAllEnvs();
    });

    it('renders the contact form', async () => {
        // Ensure env variables are missing for this test
        vi.unstubAllEnvs();
        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        render(<Contact />);

        expect(screen.getByText("Let's Connect")).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('falls back to mailto when EmailJS is not configured', async () => {
        // Clear env vars to simulate unconfigured EmailJS
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', '');

        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        render(<Contact />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@test.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello World' } });

        // Submit form
        fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(window.location.href).toContain('mailto:test@example.com');
            expect(window.location.href).toContain('subject=Portfolio%20Inquiry%20from%20John%20Test');
            expect(window.location.href).toContain('body=Name%3A%20John%20Test%0AEmail%3A%20john%40test.com%0A%0AMessage%3A%0AHello%20World');
            expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        });
    });

    it('submits form via EmailJS when configured successfully', async () => {
        // Mock env vars for EmailJS
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        (emailjs.sendForm as any).mockResolvedValueOnce({ status: 200, text: 'OK' });

        render(<Contact />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@test.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Great work!' } });

        // Submit form
        fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

        // Check loading state
        expect(screen.getByText('Sending...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

        await waitFor(() => {
            expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
            expect(emailjs.sendForm).toHaveBeenCalledWith(
                'test_service',
                'test_template',
                expect.any(HTMLFormElement),
                { publicKey: 'test_public_key' }
            );
            expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        });
    });

    it('shows error state when EmailJS submission fails', async () => {
        // Mock env vars for EmailJS
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        (emailjs.sendForm as any).mockRejectedValueOnce(new Error('Network Error'));

        // Prevent console.error from cluttering test output
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<Contact />);

        // Fill and submit
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Error Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'error@test.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Fail this' } });
        fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
            expect(screen.getByText('Failed to send message. Please try again or email directly.')).toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });

    it('resets form from success state', async () => {
        // Set up env for fast fallback path to reach success state
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', '');

        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        render(<Contact />);

        // Fill and submit
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@test.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });
        fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        });

        // Click to reset
        fireEvent.click(screen.getByRole('button', { name: /send another message/i }));

        expect(screen.getByText("Let's Connect")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

        // Verify fields are cleared
        expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('');
    });

    it('resets form from error state', async () => {
        // Setup for error state
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        vi.resetModules();
        const { default: Contact } = await import('./Contact');

        (emailjs.sendForm as any).mockRejectedValueOnce(new Error('Network Error'));
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<Contact />);

        // Fill and submit
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Error Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'error@test.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Fail this' } });
        fireEvent.submit(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        });

        // Click to reset
        fireEvent.click(screen.getByRole('button', { name: /try again/i }));

        expect(screen.getByText("Let's Connect")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

        // Verify fields are cleared
        expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText('Email') as HTMLInputElement).value).toBe('');
        expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toBe('');

        consoleSpy.mockRestore();
    });
});
