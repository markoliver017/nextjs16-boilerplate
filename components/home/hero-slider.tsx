"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    overlay: string;
    image?: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Build Amazing Content",
        subtitle: "Experiences",
        description:
            "A modern, high-performance CMS boilerplate built with Next.js 15, Tailwind CSS, and shadcn/ui.",
        ctaText: "Get Started",
        ctaLink: "#",
        overlay: "from-blue-900/80 to-indigo-900/70",
        image: "/slides-1.jpg",
    },
    {
        id: 2,
        title: "Powerful Features",
        subtitle: "At Your Fingertips",
        description:
            "Leverage cutting-edge technologies and best practices to create stunning, performant websites.",
        ctaText: "Explore Features",
        ctaLink: "#",
        overlay: "from-purple-900/80 to-pink-900/70",
        image: "/slides-2.jpg",
    },
    {
        id: 3,
        title: "Scale With Confidence",
        subtitle: "Built for Growth",
        description:
            "Enterprise-ready architecture with authentication, database integration, and optimized performance.",
        ctaText: "Learn More",
        ctaLink: "#",
        overlay: "from-red-900/80 to-orange-900/70",
        image: "/slides-3.jpg",
    },
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    // Automatic cycling
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);

        return () => clearInterval(timer);
    }, [currentSlide]);

    const handleNext = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0"
                >
                    {/* Slide Content */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="container mx-auto px-4 z-10">
                            <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white"
                                >
                                    ✨ Slide {slides[currentSlide].id} of {slides.length}
                                </motion.div>

                                {/* Title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl lg:font-extrabold text-white drop-shadow-2xl"
                                >
                                    {slides[currentSlide].title}
                                    <span className="block text-primary mt-2">
                                        {slides[currentSlide].subtitle}
                                    </span>
                                </motion.h1>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg"
                                >
                                    {slides[currentSlide].description}
                                </motion.p>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <Button
                                        size="lg"
                                        className="group bg-white text-gray-900 hover:bg-white/90"
                                    >
                                        {slides[currentSlide].ctaText}
                                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>

                        {/* Background Image with Gradient Overlay */}
                        {slides[currentSlide].image ? (
                            <>
                                <Image
                                    src={slides[currentSlide].image!}
                                    alt={`${slides[currentSlide].title} background`}
                                    fill
                                    className="object-cover -z-20"
                                    priority={currentSlide === 0}
                                    quality={90}
                                />
                                <div
                                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${slides[currentSlide].overlay}`}
                                />
                            </>
                        ) : (
                            <>
                                <div
                                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${slides[currentSlide].overlay}`}
                                />
                                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/20%),transparent)]" />
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                aria-label="Next slide"
            >
                <ChevronRight className="size-6 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? "bg-white w-8"
                                : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
