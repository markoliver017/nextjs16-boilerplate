"use client";

import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const articles = [
    {
        id: 1,
        title: "Getting Started with Next.js 15",
        description:
            "Learn how to build modern web applications with the latest features in Next.js 15 and the App Router.",
        date: "Oct 20, 2025",
        readTime: "5 min read",
        category: "Tutorial",
    },
    {
        id: 2,
        title: "Mastering Tailwind CSS",
        description:
            "Discover advanced techniques and best practices for building beautiful UIs with Tailwind CSS.",
        date: "Oct 18, 2025",
        readTime: "8 min read",
        category: "Design",
    },
    {
        id: 3,
        title: "Building Scalable APIs",
        description:
            "A comprehensive guide to designing and implementing scalable RESTful APIs for modern applications.",
        date: "Oct 15, 2025",
        readTime: "12 min read",
        category: "Backend",
    },
    {
        id: 4,
        title: "React Performance Optimization",
        description:
            "Tips and tricks to optimize your React applications for better performance and user experience.",
        date: "Oct 12, 2025",
        readTime: "10 min read",
        category: "Performance",
    },
    {
        id: 5,
        title: "TypeScript Best Practices",
        description:
            "Essential TypeScript patterns and practices to write safer and more maintainable code.",
        date: "Oct 10, 2025",
        readTime: "7 min read",
        category: "Development",
    },
    {
        id: 6,
        title: "Modern Authentication Strategies",
        description:
            "Explore different authentication methods and learn how to implement secure auth in your apps.",
        date: "Oct 8, 2025",
        readTime: "15 min read",
        category: "Security",
    },
];

export function ArticleListSection() {
    const fetchSession = async () => {
        const session = await authClient.getSession();

        console.log("Client log session", session);
    };
    fetchSession();

    return (
        <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4 mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Latest Articles
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of tutorials, guides, and
                        insights to help you build better applications.
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                        >
                            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                            {article.category}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl">
                                        {article.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {article.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="size-4" />
                                            <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="size-4" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="ghost"
                                        className="w-full group"
                                    >
                                        Read More
                                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center mt-12"
                >
                    <Button size="lg" variant="outline">
                        View All Articles
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
