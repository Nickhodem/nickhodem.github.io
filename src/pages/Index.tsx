import Navbar from "@/components/Navbar";
import NeuralBackground from "@/components/NeuralBackground";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import BioSection from "@/components/BioSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid relative">
      <NeuralBackground />
      <Navbar />
      <HeroSection />
      <MissionSection />
      <BioSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
