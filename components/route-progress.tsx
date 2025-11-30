"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteProgress() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start loading animation
        setIsLoading(true);
        setProgress(30);

        // Simulate progress
        const timer1 = setTimeout(() => setProgress(60), 100);
        const timer2 = setTimeout(() => setProgress(90), 200);
        const timer3 = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 200);
        }, 400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pathname, searchParams]);

    if (!isLoading) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary transition-all duration-200 ease-out"
            style={{
                width: `${progress}%`,
                boxShadow: "0 0 10px rgba(var(--primary), 0.7)",
            }}
        />
    );
}
