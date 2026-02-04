import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10">
                {/* 404 Number */}
                <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 -mt-6">
                    Page Not Found
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* Back Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
