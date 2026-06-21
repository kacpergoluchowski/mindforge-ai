import HeroSection from "@/features/landing-page/components/HeroSection";
import LandingHeader from "@/features/landing-page/components/LandingHeader";

export default function Home() {
  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]
      "
    >
      <LandingHeader />
      <HeroSection />
    </div>
  );
}