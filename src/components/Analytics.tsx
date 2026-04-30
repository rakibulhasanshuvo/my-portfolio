'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics implementation
export default function Analytics() {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

    // Validate GA_ID to prevent script injection
    // GA IDs typically follow formats like G-XXXXXXXXXX or UA-XXXXXXXX-X
    const isValidGAId = GA_ID && /^[A-Z0-9-]+$/i.test(GA_ID);

    useEffect(() => {
        if (!GA_ID && process.env.NODE_ENV === 'development') {
            console.warn(
                'Google Analytics ID (NEXT_PUBLIC_GA_ID) is missing. Analytics will not be loaded.'
            );
        } else if (GA_ID && !isValidGAId && process.env.NODE_ENV === 'development') {
            console.warn(
                'Google Analytics ID (NEXT_PUBLIC_GA_ID) is invalid. Analytics will not be loaded.'
            );
        }
    }, [GA_ID, isValidGAId]);

    if (!isValidGAId) {
        return null;
    }

    return (
        <>
            {/* Google Analytics Global Site Tag (gtag.js) */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="gtag-init" strategy="afterInteractive">
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
