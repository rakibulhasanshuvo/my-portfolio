import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { Transition } from 'framer-motion';

interface ContactSuccessProps {
    shouldReduceMotion: boolean;
    isMobile: boolean;
    transition: Transition;
    resetForm: () => void;
}

export function ContactSuccess({ shouldReduceMotion, isMobile, transition, resetForm }: ContactSuccessProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <motion.div
                initial={shouldReduceMotion ? false : (isMobile ? { opacity: 0 } : { scale: 0 })}
                animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                layout={!isMobile}
                transition={{ ...transition }}
                className="bg-green-500/20 p-4 rounded-full text-green-400 mb-6"
                style={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            >
                <CheckCircle size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
            <p className="text-foreground/60">I&apos;ll get back to you as soon as possible.</p>
            <button
                onClick={resetForm}
                className="mt-8 text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
                Send another message
            </button>
        </div>
    );
}
