import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Recipes from "@/components/Recipes";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
      <Recipes />
      <Footer />
    </main>
  );
}
