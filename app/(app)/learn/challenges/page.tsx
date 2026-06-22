import PageHeader from "@/components/shared/PageHeader";
import ChallengeBanner from "@/features/challenges/components/ChallengeBanner";
import ChallengeCategories from "@/features/challenges/components/ChallengeCategories";
import ChallengesMainSection from "@/features/challenges/components/ChallengesMainSection";
import ChallengeStats from "@/features/challenges/components/ChallengeStats";
import { Plus } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Challenges"
        subtitle="Test your skills, solve real problems and level up."
        buttonVisible
        buttonText="Create Challenge"
        buttonIcon={Plus}
      />
      <ChallengeBanner />
      <ChallengeStats />
      <ChallengeCategories />
      <ChallengesMainSection />
    </div>
  );
}
