import ChallengeBanner from "@/features/challenges/components/ChallengeBanner";
import ChallengeCategories from "@/features/challenges/components/ChallengeCategories";
import ChallengesHero from "@/features/challenges/components/ChallengesHero";
import ChallengesMainSection from "@/features/challenges/components/ChallengesMainSection";
import ChallengeStats from "@/features/challenges/components/ChallengeStats";

export default function ChallengesPage() {
  return (
    <div className="space-y-8">
      <ChallengesHero />
      <ChallengeBanner />
      <ChallengeStats />
      <ChallengeCategories />
      <ChallengesMainSection />
    </div>
  );
}