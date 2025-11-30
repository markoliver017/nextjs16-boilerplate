import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ArticleListSection } from "@/components/article-list-section";
import { Footer } from "@/components/footer";

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
