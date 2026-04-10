import React from 'react';

export function AuroraGradients() {
    return (
        <div className="hidden md:block">
            <div className="absolute inset-0 pointer-events-none -z-10" style={{ perspective: '1000px' }}>
                <div
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"
                    style={{ transform: 'translateZ(-100px) scale(1.1)', willChange: 'transform' }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"
                    style={{ transform: 'translateZ(-200px) scale(1.2)', willChange: 'transform' }}
                />
                <div
                    className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: '2s' }}
                />
                <div
                    className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/5 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: '4s' }}
                />
            </div>
        </div>
    );
}
