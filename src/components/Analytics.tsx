'use client';

import Script from 'next/script';

// Placeholder for Google Analytics or other scripts
export default function Analytics() {
    // Don't render scripts if ID is missing or invalid
    const GA_ID = 'G-XXXXXXXXXX'; // Replace with real ID
    if (GA_ID === 'G-XXXXXXXXXX') {
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
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}
