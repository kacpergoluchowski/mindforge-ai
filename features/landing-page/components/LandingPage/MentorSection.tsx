import AiConversationDemo from "./AiConversationDemo";
import AnimatedSection from "./AnimatedSection";
import LandingCtaLink from "./LandingCtaLink";
import LandingSectionHeader from "./LandingSectionHeader";

// Sekcja AI Mentora pokazuje produkt w akcji, zamiast tylko opisywać funkcję tekstem.
export default function MentorSection() {
  return (
    <section
      id="mentor"
      aria-labelledby="mentor-title"
      className="px-6 py-12 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/10 bg-[#0d1424] p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
        <AnimatedSection>
          <LandingSectionHeader
            eyebrow="AI Mentor"
            title="Get help exactly when you get stuck."
            titleId="mentor-title"
            subtitle="Ask questions about lessons, challenges, code, roadmaps and career decisions. MindForge uses your learning context to give better answers."
          />

          <div className="mt-8">
            <LandingCtaLink href="/ai-mentor/chat">
              Open AI Mentor
            </LandingCtaLink>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <AiConversationDemo />
        </AnimatedSection>
      </div>
    </section>
  );
}
