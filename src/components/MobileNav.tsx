'use client';

import { useState } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
];

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

interface MobileNavLinkProps {
    href: string;
    name: string;
    closeMenu: () => void;
}

function MobileNavLink({ href, name, closeMenu }: MobileNavLinkProps) {
    return (
        <div className="overflow-hidden">
            <motion.div variants={linkVars}>
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

function ResumeLink() {
    return (
        <div className="mt-8 flex flex-col items-center gap-6">
            <motion.div variants={linkVars}>
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
    );
}

function CloseButton({ closeMenu }: { closeMenu: () => void }) {
    return (
        <div className="absolute top-6 right-6 z-[10000]">
            <button
                onClick={closeMenu}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close menu"
            >
                <X size={32} />
            </button>
        </div>
    );
}

interface MobileMenuProps {
    closeMenu: () => void;
}

function MobileMenu({ closeMenu }: MobileMenuProps) {
    return (
        <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-background origin-top z-[9999] flex flex-col justify-center items-center p-10"
        >
            <CloseButton closeMenu={closeMenu} />

            <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col gap-6 text-center font-bold text-4xl"
            >
                {navLinks.map((link, index) => (
                    <MobileNavLink
                        key={`${link.name}-${index}`}
                        href={link.href}
                        name={link.name}
                        closeMenu={closeMenu}
                    />
                ))}
                <ResumeLink />
            </motion.div>
        </motion.div>
    );
}

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    useBodyScrollLock(isOpen);

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
