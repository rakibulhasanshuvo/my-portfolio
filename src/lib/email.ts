import emailjs from '@emailjs/browser';
import { profile } from '@/data/profile';

// EmailJS Configuration using environment variables
export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

const YOUR_EMAIL = profile.email;

export const isEmailJSConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

export async function handleMailtoFallback(form: HTMLFormElement) {
    const formData = new FormData(form);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
}

export async function sendEmailViaService(form: HTMLFormElement) {
    return await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        {
            publicKey: EMAILJS_PUBLIC_KEY,
        }
    );
}
