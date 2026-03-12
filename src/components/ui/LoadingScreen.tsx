'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Counter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[12rem] md:text-[18rem] font-black text-white/5 absolute -top-40 md:-top-60 select-none pointer-events-none"
                        >
                            {Math.min(progress, 100)}%
                        </motion.div>

                        {/* Animated Logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-12 relative"
                        >
                            <span className="text-5xl md:text-7xl font-bold tracking-tighter">
                                Rakibul<span className="text-purple-600">.</span>
                            </span>
                            <motion.div
                                className="absolute -bottom-4 left-0 h-1 bg-purple-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </motion.div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 h-8 bg-purple-600/20"
                                        animate={{
                                            backgroundColor: progress > (i + 1) * 20 ? "#9333ea" : "rgba(147, 51, 234, 0.2)",
                                            height: progress > (i + 1) * 20 ? [32, 48, 32] : 32
                                        }}
                                        transition={{ duration: 0.5, repeat: progress > (i + 1) * 20 ? Infinity : 0 }}
                                    />
                                ))}
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white/20 text-xs tracking-[0.3em] uppercase font-bold"
                            >
                                {progress < 100 ? "Initializing Experience" : "Ready to Vibe"}
                            </motion.p>
                        </div>
                    </div>

                    {/* Background Decorative Elements */}
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full -z-10"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1, 1.3, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/[0.02] rounded-full -z-10"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
