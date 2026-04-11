import { useState, useRef, FormEvent } from 'react';
import { isEmailJSConfigured, handleMailtoFallback, sendEmailViaService } from '@/lib/email';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function useContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<FormState>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!formRef.current) return;

        setFormState('submitting');
        setErrorMessage('');

        if (!isEmailJSConfigured) {
            await handleMailtoFallback(formRef.current);
            setFormState('success');
            return;
        }

        try {
            await sendEmailViaService(formRef.current);
            setFormState('success');
        } catch (error) {
            console.error('EmailJS Error:', error);
            setErrorMessage('Failed to send message. Please try again or email directly.');
            setFormState('error');
        }
    }

    function resetForm() {
        setFormState('idle');
        setErrorMessage('');
        formRef.current?.reset();
    }

    return { formRef, formState, errorMessage, handleSubmit, resetForm };
}
