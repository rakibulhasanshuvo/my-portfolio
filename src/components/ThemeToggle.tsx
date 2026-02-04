'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            suppressHydrationWarning
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 180,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon size={20} className="text-white" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? -180 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center justify-center"
            >
                <Sun size={20} className="text-yellow-400" />
            </motion.div>
        </button>
    );
}
