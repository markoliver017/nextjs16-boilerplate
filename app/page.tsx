import { HeroSection } from "@/components/home/hero-section";
import { ArticleListSection } from "@/components/home/article-list-section";

export default function Home() {
    return (
        <>
            <HeroSection
                backgroundImage="/slides-1.jpg"
                useGradientOverlay={true}
            />

            <ArticleListSection />
        </>
    );
}

export const metadata = {
    title: "CMS Boilerplate - Home",
    description:
        "A modern, high-performance CMS boilerplate built with Next.js 15, Tailwind CSS, and shadcn/ui",
};
