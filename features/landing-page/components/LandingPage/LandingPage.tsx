import CoursesSection from "./CoursesSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import MentorSection from "./MentorSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";

// Główny kontener landing page.
// Kolejność sekcji jest celowo liniowa: hero -> wartość produktu -> kursy -> AI -> social proof -> cena.
// Dzięki temu strona prowadzi użytkownika od pierwszego wrażenia do decyzji o rejestracji.
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Skip link poprawia dostępność dla osób poruszających się klawiaturą. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>
      <LandingHeader />

      {/* Główna treść ma osobny landmark <main>, header i footer są poza nim. */}
      <main id="main-content" className="min-h-screen bg-[#020617]">
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <MentorSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  );
}
