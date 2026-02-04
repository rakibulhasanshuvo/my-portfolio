'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for actual content
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
                >
                    <div className="text-center">
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className="text-4xl font-bold">
                                Rakibul<span className="text-purple-500">.</span>
                            </span>
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: 'easeInOut'
                                }}
                                className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-white/40 text-sm tracking-wider"
                        >
                            Loading experience...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
