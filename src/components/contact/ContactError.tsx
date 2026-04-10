import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import { Transition } from 'framer-motion';

interface ContactErrorProps {
    shouldReduceMotion: boolean;
    isMobile: boolean;
    transition: Transition;
    errorMessage: string;
    resetForm: () => void;
    email: string;
}

export function ContactError({ shouldReduceMotion, isMobile, transition, errorMessage, resetForm, email }: ContactErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <motion.div
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { scale: 0 })}
                animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                layout={!isMobile}
                transition={{ ...transition }}
                className="bg-red-500/20 p-4 rounded-full text-red-400 mb-6"
                style={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            >
                <AlertCircle size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Something Went Wrong</h3>
            <p className="text-foreground/60 mb-4">{errorMessage}</p>
            <a
                href={`mailto:${email}`}
                className="text-purple-400 hover:text-purple-300 transition-colors"
            >
                Email me directly
            </a>
            <button
                onClick={resetForm}
                className="mt-4 text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
