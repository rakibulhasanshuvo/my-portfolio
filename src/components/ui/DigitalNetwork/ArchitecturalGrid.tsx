import React from 'react';

export function ArchitecturalGrid() {
    return (
        <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                color: 'var(--foreground)',
            }}
        />
    );
}
