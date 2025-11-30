"use client"; // 👈 Must include this directive

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggleButton() {
    // 1. Get the theme state and setter function from next-themes
    const { theme, setTheme } = useTheme();

    // 2. Use state to manage hydration (avoids UI flicker on initial load)
    const [mounted, setMounted] = useState(false);

    // useEffect runs after component mounts, setting mounted to true
    useEffect(() => {
        setMounted(true);
    }, []);

    // Show a placeholder or nothing until the component is mounted
    if (!mounted) {
        return null;
    }

    // 3. Determine the current *mode* and the *next* mode for the button text
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    const buttonText = isDark ? "☀️" : "🌙";

    return (
        <button
            onClick={() => setTheme(nextTheme)}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                // These colors will automatically apply the CSS variables
                // you defined in your global.css because of Tailwind/next-themes.
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
            }}
        >
            {buttonText}
        </button>
    );
}
