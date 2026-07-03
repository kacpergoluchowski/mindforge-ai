import CoursesSection from "./CoursesSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import MentorSection from "./MentorSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <MentorSection />
      <TestimonialsSection />
      <PricingSection />
      <LandingFooter />
    </main>
  );
}
