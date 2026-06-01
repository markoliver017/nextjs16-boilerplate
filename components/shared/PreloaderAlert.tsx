"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const imageLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality: number;
}) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function PreloaderAlert({ isLoading }: { isLoading: boolean }) {
    return (
        <>
            {isLoading && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoading ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Linear Gradient Background */}
                    <div
                        className="bg-white/60 dark:bg-black/80"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                    />

                    {/* Animated Loading Container */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="flex justify-center items-center p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <Image
                            onLoad={() => {
                                console.log("Image loaded");
                            }}
                            src="/loader/loader_2.gif"
                            className="object-contain"
                            width={300}
                            height={300}
                            alt="Logo"
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
