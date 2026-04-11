import { FormEvent, RefObject } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
    formRef: RefObject<HTMLFormElement>;
    handleSubmit: (e: FormEvent) => void;
    formState: 'idle' | 'submitting' | 'success' | 'error';
}

export function ContactForm({ formRef, handleSubmit, formState }: ContactFormProps) {
    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="user_name" className="text-sm font-medium text-foreground/60 ml-1">Name</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        required
                        className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="user_email" className="text-sm font-medium text-foreground/60 ml-1">Email</label>
                    <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        required
                        className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/60 ml-1">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:bg-foreground/10 text-foreground transition-all resize-none"
                    placeholder="Tell me about your project..."
                />
            </div>

            <button
                type="submit"
                disabled={formState === 'submitting'}
                className="mt-2 bg-foreground text-background font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {formState === 'submitting' ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send size={20} />
                    </>
                )}
            </button>
        </form>
    );
}
