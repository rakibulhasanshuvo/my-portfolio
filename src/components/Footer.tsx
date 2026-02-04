'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const SOCIAL_LINKS = {
    linkedin: 'https://www.linkedin.com/in/muhammad-rakibul-hasan-shuvo-5783363a0',
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
    email: 'm.rakibul.h45@gmail.com'
};

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo */}
                <div className="text-xl font-bold tracking-tight">
                    Rakibul<span className="text-purple-500">.</span>
                </div>

                {/* Copyright */}
                <div className="text-sm text-white/40">
                    © {new Date().getFullYear()} Rakibul Hasan Shuvo. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={SOCIAL_LINKS.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Twitter"
                    >
                        <Twitter size={20} />
                    </a>
                    <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
