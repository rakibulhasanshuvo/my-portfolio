'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuVars = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] as [number, number, number, number] }
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
    };

    const containerVars = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
    };

    const linkVars = {
        initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as [number, number, number, number] } },
        open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] as [number, number, number, number] } }
    };

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
                {isOpen && (
                    <motion.div
                        variants={menuVars}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-background origin-top z-[9999] flex flex-col justify-center items-center p-10"
                    >
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        <motion.div
                            variants={containerVars}
                            initial="initial"
                            animate="open"
                            exit="initial"
                            className="flex flex-col gap-6 text-center font-bold text-4xl"
                        >
                            {navLinks.map((link) => (
                                <div key={link.name} className="overflow-hidden">
                                    <motion.div variants={linkVars}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-foreground hover:text-purple-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                            <div className="mt-8 flex flex-col items-center gap-6">
                                <motion.div variants={linkVars}>
                                    <Link
                                        href="/resume.pdf"
                                        target="_blank"
                                        className="text-lg font-medium text-foreground/50 hover:text-foreground transition-colors"
                                    >
                                        View Resume
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
