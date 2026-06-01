"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
    backgroundImage?: string;
    useGradientOverlay?: boolean;
}

export function HeroSection({
    backgroundImage,
    useGradientOverlay = true,
}: HeroSectionProps = {}) {
    return (
        <section className="relative w-full py-20 md:py-24 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="flex flex-col items-center text-center space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-secondary"
                    >
                        ✨ Welcome to our CMS Platform
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-4xl text-white font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl lg:font-extrabold max-w-4xl drop-shadow-lg"
                    >
                        Build Amazing Content
                        <span className="text-primary"> Experiences</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-xl text-white/80 dark:text-white/60 max-w-2xl"
                    >
                        A modern, high-performance CMS boilerplate built with
                        Next.js 15, Tailwind CSS, and shadcn/ui. Create stunning
                        content-driven websites with ease.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="group">
                            Get Started
                            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="outline">
                            View Documentation
                        </Button>
                    </motion.div>

                    {/* Key Highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 w-full max-w-4xl"
                    >
                        {[
                            { value: "100+", label: "Components" },
                            { value: "50K+", label: "Users" },
                            { value: "99%", label: "Satisfaction" },
                        ].map((highlight, index) => (
                            <motion.div
                                key={highlight.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3 + index * 0.15,
                                }}
                                className="flex flex-col items-center p-6 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="text-4xl font-bold text-white/80 dark:text-white/60 drop-shadow-md">
                                    {highlight.value}
                                </div>
                                <div className="text-sm font-medium text-slate-200/60 dark:text-slate-200/40 mt-2">
                                    {highlight.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 1.2 }}
                        className="mt-8"
                    >
                        <div className="p-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm animate-bounce">
                            <ChevronDown className="size-6 text-primary" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Image or Gradient Overlay */}
            {backgroundImage ? (
                <>
                    <Image
                        src={backgroundImage}
                        alt="Hero background"
                        fill
                        className="object-cover -z-20"
                        priority
                        quality={90}
                    />
                    {useGradientOverlay && (
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-red-900/75" />
                    )}
                </>
            ) : (
                <>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-red-900/75" />
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/20%),transparent)]" />
                </>
            )}
        </section>
    );
}
