'use client';

import { Github, Linkedin, Mail, Instagram, Facebook } from 'lucide-react';
import { profile } from '@/data/profile';
import { XIcon, FiverrIcon, UpworkIcon } from '@/components/ui/Icons';

export default function Footer() {
    const social = profile.social;

    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo */}
                <div className="text-xl font-bold tracking-tight">
                    Rakibul<span className="text-purple-500">.</span>
                </div>

                {/* Copyright */}
                <div className="text-sm text-white/40">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href={social.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Upwork"
                    >
                        <UpworkIcon size={20} />
                    </a>
                    <a
                        href={social.fiverr}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="Fiverr"
                    >
                        <FiverrIcon size={20} />
                    </a>
                    <a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors"
                        aria-label="X (Twitter)"
                    >
                        <XIcon size={18} />
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
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
