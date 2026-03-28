import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as React from 'react';

// Create a spy for emailjs sendForm before mocking it
const sendFormSpy = vi.fn();

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: (...args: any[]) => sendFormSpy(...args),
  }
}));

describe('Contact Component', () => {
    let Contact: any;
    const originalLocation = window.location;

    beforeEach(async () => {
        vi.clearAllMocks();
        sendFormSpy.mockReset();

        // Mock window.location for mailto fallback
        delete (window as any).location;
        window.location = { ...originalLocation, href: '' };

        // Clears module cache so `process.env` reads fresh inside Contact.tsx
        vi.resetModules();

        // Ensure emailjs variables are empty by default for fallback testing
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', '');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', '');

        // Dynamically import the component after stubbing env
        const mod = await import('./Contact');
        Contact = mod.default;
    });

    afterEach(() => {
        window.location = originalLocation;
        vi.unstubAllEnvs();
    });

    it('renders the form elements correctly', () => {
        render(<Contact />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });

    it('uses mailto fallback when EmailJS is not configured', async () => {
        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello World' } });

        const form = screen.getByRole('button', { name: /Send Message/i }).closest('form');
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(window.location.href).toContain('mailto:');
            expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
        });

        expect(sendFormSpy).not.toHaveBeenCalled();
    });

    it('submits successfully using EmailJS when configured', async () => {
        // Now override env specific for this test
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        // We must re-import because the component reads env on module load
        vi.resetModules();
        const mod = await import('./Contact');
        Contact = mod.default;

        sendFormSpy.mockResolvedValueOnce({ status: 200, text: 'OK' });

        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello World' } });

        const form = screen.getByRole('button', { name: /Send Message/i }).closest('form');
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
        });

        expect(sendFormSpy).toHaveBeenCalledTimes(1);
        expect(sendFormSpy).toHaveBeenCalledWith(
            'test_service_id',
            'test_template_id',
            expect.any(HTMLFormElement),
            { publicKey: 'test_public_key' }
        );
    });

    it('displays error message when EmailJS fails', async () => {
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        vi.resetModules();
        const mod = await import('./Contact');
        Contact = mod.default;

        sendFormSpy.mockRejectedValueOnce(new Error('Network error'));

        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello World' } });

        const form = screen.getByRole('button', { name: /Send Message/i }).closest('form');
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(screen.getByText(/Something Went Wrong/i)).toBeInTheDocument();
            expect(screen.getByText(/Failed to send message/i)).toBeInTheDocument();
        });

        expect(sendFormSpy).toHaveBeenCalledTimes(1);
    });

    it('allows resetting form after success', async () => {
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'test_service_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'test_template_id');
        vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'test_public_key');

        vi.resetModules();
        const mod = await import('./Contact');
        Contact = mod.default;

        sendFormSpy.mockResolvedValueOnce({ status: 200, text: 'OK' });

        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        const form = screen.getByRole('button', { name: /Send Message/i }).closest('form');
        fireEvent.submit(form!);

        await waitFor(() => {
            expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
        });

        const sendAnotherButton = screen.getByRole('button', { name: /Send another message/i });
        fireEvent.click(sendAnotherButton);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    });
});
