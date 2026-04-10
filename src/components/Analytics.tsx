'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics implementation
export default function Analytics() {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    const isValidId = GA_ID && /^[A-Z0-9-]+$/i.test(GA_ID);

    useEffect(() => {
        if (!isValidId && process.env.NODE_ENV === 'development') {
            console.warn('Google Analytics ID (NEXT_PUBLIC_GA_ID) is missing or invalid. Analytics will not be loaded.');
        }
    }, [isValidId]);

    // Don't render scripts if ID is missing or invalid
    if (!isValidId) {
        return null;
    }

    return (
        <>
            {/* Google Analytics Global Site Tag (gtag.js) */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                      page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
