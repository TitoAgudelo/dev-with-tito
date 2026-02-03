import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-12 py-4">
        <AchievementsSection />
        <AboutSection />
      </div>
      <ProjectsSection />
      <EmailSection />
      <Footer />
    </main>
  );
}
