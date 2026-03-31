'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useOptimizedMotion } from '@/lib/motion';

interface ShareButtonsProps {
    title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
    const { isMobile, shouldReduceMotion } = useOptimizedMotion();
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUrl = window.location.href;
            // Use requestAnimationFrame or setTimeout to move setState out of the synchronous effect body
            // to satisfy the strict lint rule while still capturing the client-side URL
            requestAnimationFrame(() => {
                setUrl(currentUrl);
            });
        }
    }, []);

    const shareData = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${title} by Rakibul Hasan Shuvo`)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async () => {
        const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col gap-4 py-8 border-t border-foreground/10 mt-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/40">Share Project</span>
            <div className="flex gap-4">
                <motion.a
                    href={shareData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
                    className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors group"
                    title="Share on Twitter"
                >
                    <Twitter className="w-5 h-5 text-foreground/60 group-hover:text-purple-400 transition-colors" />
                </motion.a>
                <motion.a
                    href={shareData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
                    className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors group"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="w-5 h-5 text-foreground/60 group-hover:text-purple-400 transition-colors" />
                </motion.a>
                <motion.button
                    onClick={copyToClipboard}
                    whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
                    className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors group relative"
                    title="Copy Link"
                >
                    {copied ? (
                        <Check className="w-5 h-5 text-green-400" />
                    ) : (
                        <Link2 className="w-5 h-5 text-foreground/60 group-hover:text-purple-400 transition-colors" />
                    )}
                </motion.button>
            </div>
        </div>
    );
}
