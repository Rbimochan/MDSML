
export function MDSMLLogo({ className = "h-8 w-8", showText = true }: { className?: string, showText?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                >
                    {/* Geometric Structure matching the user's image (approximate tesseract/star projection) */}

                    {/* Central Axis / Core */}
                    <path d="M50 20 L50 80" className="opacity-80" />
                    <path d="M20 50 L80 50" className="opacity-80" />

                    {/* Outer Points to Center - Creating the star/prism effect */}
                    <path d="M50 20 L80 50 L50 80 L20 50 Z" className="opacity-50" />
                    <path d="M50 20 L20 35 L50 50 L80 35 Z" className="opacity-30" />
                    <path d="M50 80 L20 65 L50 50 L80 65 Z" className="opacity-30" />

                    {/* 3D Connecting Lines - The "Hypercube" look */}
                    <path d="M20 35 L20 65" />
                    <path d="M80 35 L80 65" />
                    <path d="M20 35 L50 10" />
                    <path d="M80 35 L50 10" />
                    <path d="M20 65 L50 90" />
                    <path d="M80 65 L50 90" />

                    {/* Accent Plane (Simulated with fill) */}
                    <path d="M50 50 L80 50 L50 20 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
                    <path d="M50 50 L20 50 L50 80 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
                </svg>
            </div>
            {showText && (
                <span className="text-xl font-bold tracking-widest text-foreground">
                    MDSML
                </span>
            )}
        </div>
    );
}
