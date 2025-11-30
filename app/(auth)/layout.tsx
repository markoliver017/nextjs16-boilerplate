import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Authenticate | Next.js Boilerplate",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(/slides-1.jpg)" }}
        >
            <div className="min-h-screen flex items-center justify-center ">
                <div className="w-full max-w-md rounded-lg bg-white/80 p-8 shadow-lg dark:bg-gray-800/80">
                    {children}
                </div>
            </div>
        </div>
    );
}
