'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { profile } from '@/data/profile';

const FiverrIcon = ({ size = 20 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M11.233 13.92H8.62v-3.793h2.613V7.513h3.613v2.614h2.445v3.792h-2.445v6.521c0 1.556.703 2.115 2.131 2.115.545 0 1.054-.07 1.442-.187v3.297c-.947.28-2.227.436-3.418.436-4.04 0-5.776-2.022-5.776-5.263V13.92zM2.81 13.92V10.13h1.838v-.031c0-4.041 2.39-6.37 6.44-6.37 1.13 0 2.227.187 2.943.436v3.313a5.53 5.53 0 0 0-1.635-.234c-1.884 0-2.553.918-2.553 2.522v.364h4.156v3.791H2.81zM21.19 10.128h2.81V13.92h-2.81v-3.792zM21.19 18.73h2.81v3.792h-2.81V18.73z" />
    </svg>
);

const UpworkIcon = ({ size = 20 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M18.561 3.31a5.574 5.574 0 0 0-5.455 4.479 10.751 10.751 0 0 1-2.619-5.967H7.26v7.621c0 1.862-1.516 3.378-3.379 3.378S.503 11.305.503 9.443V1.822H.5V1.82h3.38v7.623c0 .618.503 1.121 1.121 1.121.618 0 1.122-.503 1.122-1.121V1.822h3.381V1.82h.007c.023 4.385 1.564 8.53 4.333 11.64l-1.845 8.722h3.38l1.203-5.69a5.57 5.57 0 0 0 5.38 3.646 5.577 5.577 0 0 0 5.539-5.593V1.82h-3.381v1.491zm0 11.411c-1.19 0-2.325-.494-3.13-1.39l.171-.81a10.44 10.44 0 0 0 2.959-1.428V11.2a1.861 1.861 0 0 1 1.861 1.861 1.863 1.863 0 0 1-1.861 1.66z" />
    </svg>
);

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
                        aria-label="Twitter"
                    >
                        <Twitter size={20} />
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
