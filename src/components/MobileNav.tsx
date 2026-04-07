'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useOptimizedMotion } from '@/lib/motion';
import { useScrollLock } from '@/hooks/useScrollLock';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
];

const getMenuVars = (isMobile: boolean) => ({
    initial: { opacity: 0, scaleY: isMobile ? 1 : 0 },
    animate: {
        opacity: 1,
        scaleY: 1,
        transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] as const }
    },
    exit: {
        opacity: 0,
        scaleY: isMobile ? 1 : 0,
        transition: { delay: isMobile ? 0 : 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        transitionEnd: { display: "none" }
    }
});

const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
};

const getLinkVars = (isMobile: boolean) => ({
    initial: { opacity: 0, y: isMobile ? 0 : "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as const } },
    open: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] as const }, transitionEnd: { display: "block" } }
});

interface MobileMenuLinkProps {
    href: string;
    name: string;
    isMobile: boolean;
    shouldReduceMotion: boolean;
    closeMenu: () => void;
}

function MobileMenuLink({ href, name, isMobile, shouldReduceMotion, closeMenu }: MobileMenuLinkProps) {
    return (
        <div className="overflow-hidden">
            <motion.div variants={getLinkVars(isMobile)} layout={!isMobile} style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}>
                <Link
                    href={href}
                    onClick={closeMenu}
                    className="text-foreground hover:text-purple-400 transition-colors"
                >
                    {name}
                </Link>
            </motion.div>
        </div>
    );
}

// Dynamically configure variants inside component based on optimized motion hook
interface MobileMenuProps {
    closeMenu: () => void;
}

function MobileMenu({ closeMenu }: MobileMenuProps) {
    const { isMobile, shouldReduceMotion } = useOptimizedMotion();

    return (
        <motion.div
            variants={getMenuVars(isMobile)}
            initial="initial"
            animate={shouldReduceMotion ? undefined : "animate"}
            exit="exit"
            layout={!isMobile}
            style={shouldReduceMotion ? { opacity: 1, scaleY: 1 } : undefined}
            className="fixed inset-0 bg-background origin-top z-[9999] flex flex-col justify-center items-center p-10"
        >
            <div className="absolute top-6 right-6">
                <button
                    onClick={closeMenu}
                    className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                    aria-label="Close menu"
                >
                    <X size={32} />
                </button>
            </div>

            <motion.div
                variants={containerVars}
                initial="initial"
                animate={shouldReduceMotion ? undefined : "open"}
                exit="initial"
                layout={!isMobile}
                className="flex flex-col gap-6 text-center font-bold text-4xl"
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            >
                {navLinks.map((link) => (
                    <MobileMenuLink
                        key={link.name}
                        href={link.href}
                        name={link.name}
                        isMobile={isMobile}
                        shouldReduceMotion={shouldReduceMotion}
                        closeMenu={closeMenu}
                    />
                ))}
                <div className="mt-8 flex flex-col items-center gap-6">
                    <motion.div variants={getLinkVars(isMobile)} layout={!isMobile} style={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}>
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-foreground/50 hover:text-foreground transition-colors"
                        >
                            View Resume
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    useScrollLock(isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && <MobileMenu closeMenu={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}
