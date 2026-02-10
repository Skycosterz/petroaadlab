import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import MetricsBar from "@/components/landing/MetricsBar";
import PetroleumSection from "@/components/landing/PetroleumSection";
import WaterSection from "@/components/landing/WaterSection";
import ProcessVisualization from "@/components/landing/ProcessVisualization";
import BlogSection from "@/components/landing/BlogSection";
import ClientLogos from "@/components/landing/ClientLogos";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-manrope text-neutral-charcoal">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MetricsBar />
        <PetroleumSection />
        <WaterSection />
        <ProcessVisualization />
        <ContactForm />
        <BlogSection />
        <ClientLogos />
      </main>
      <Footer />
    </div>
  );
}
