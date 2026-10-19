import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArticlesSection from "@/components/ArticlesSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050b11]">
      <Header />

      <main>
        <Hero />

        <ArticlesSection />

        <KnowledgeSection />
      </main>

      <Footer />
    </div>
  );
}