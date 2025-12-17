import Header from "./components/Header";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Features from "./components/Features";
import Screenshots from "./components/Screenshots";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Features />
        <Screenshots />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
