import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import emailjs from '@emailjs/browser';
import { handleMailtoFallback, sendEmailViaService } from './email';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
    default: {
        sendForm: vi.fn(),
    },
}));

// Mock Profile
vi.mock('@/data/profile', () => ({
    profile: {
        email: 'test@example.com',
    },
}));

describe('email lib', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock window.location
        vi.stubGlobal('location', { href: '' });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.unstubAllEnvs();
    });

    describe('handleMailtoFallback', () => {
        it('should update window.location.href with correct mailto link', async () => {
            // Create a mock form
            const form = document.createElement('form');
            const nameInput = document.createElement('input');
            nameInput.name = 'user_name';
            nameInput.value = 'John Doe';
            const emailInput = document.createElement('input');
            emailInput.name = 'user_email';
            emailInput.value = 'john@example.com';
            const messageInput = document.createElement('textarea');
            messageInput.name = 'message';
            messageInput.value = 'Hello, this is a test message.';

            form.appendChild(nameInput);
            form.appendChild(emailInput);
            form.appendChild(messageInput);

            await handleMailtoFallback(form);

            const expectedSubject = encodeURIComponent('Portfolio Inquiry from John Doe');
            const expectedBody = encodeURIComponent('Name: John Doe\nEmail: john@example.com\n\nMessage:\nHello, this is a test message.');
            const expectedHref = `mailto:test@example.com?subject=${expectedSubject}&body=${expectedBody}`;

            expect(window.location.href).toBe(expectedHref);
        });
    });

    describe('sendEmailViaService', () => {
        it('should call emailjs.sendForm with correct parameters', async () => {
            vi.stubEnv('NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'service_123');
            vi.stubEnv('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID', 'template_456');
            vi.stubEnv('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY', 'public_key_789');

            // We need to re-import or use the exported constants if we want to be exact,
            // but since they are evaluated at module load time, we might need to reset modules
            // or just check if they are called with what we expect from env.

            // Re-import email to get updated env vars
            vi.resetModules();
            const { sendEmailViaService: sendEmail } = await import('./email');

            const form = document.createElement('form');
            (emailjs.sendForm as any).mockResolvedValue({ status: 200, text: 'OK' });

            await sendEmail(form);

            expect(emailjs.sendForm).toHaveBeenCalledWith(
                'service_123',
                'template_456',
                form,
                { publicKey: 'public_key_789' }
            );
        });

        it('should propagate errors from emailjs.sendForm', async () => {
            const form = document.createElement('form');
            const error = new Error('Failed to send');
            (emailjs.sendForm as any).mockRejectedValue(error);

            await expect(sendEmailViaService(form)).rejects.toThrow('Failed to send');
        });
    });
});
