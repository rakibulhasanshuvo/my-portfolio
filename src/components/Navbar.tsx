'use client';

import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import MobileNav from '@/components/MobileNav';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-full px-6 py-3 flex items-center justify-between md:gap-8 border border-foreground/10 w-full md:w-auto"
            >
                {/* Desktop Links */}
                <div className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Trigger */}
                <MobileNav />

                <div className="flex items-center gap-4">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="hidden md:block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                    >
                        Resume
                    </a>
                    <MagneticButton
                        href="mailto:m.rakibul.h45@gmail.com"
                        className="px-5 py-2 bg-foreground text-background rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                        Let&apos;s Talk
                    </MagneticButton>
                </div>
            </motion.nav>
        </header>
    );
}
