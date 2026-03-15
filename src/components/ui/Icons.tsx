import React from 'react';

export const XIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
    >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

export const FiverrIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
    >
        {/* f */}
        <path d="M10 5c-2 0-3 1-3 3v13" />
        <path d="M7 11h6" />
        {/* i */}
        <path d="M14 11v10" />
        <circle cx="14" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
);

export const UpworkIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
    >
        {/* u-shape connection */}
        <path d="M4 7v6a4 4 0 0 0 8 0v-2" />
        {/* connection to p */}
        <path d="M12 11c0 3 1.5 5 3.5 5s3.5-2 3.5-5V7" />
        {/* p-loop */}
        <circle cx="18.5" cy="10" r="2.5" />
    </svg>
);
