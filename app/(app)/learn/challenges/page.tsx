import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import ChallengeBanner from "@/features/challenges/components/ChallengeBanner";
import ChallengeCategories from "@/features/challenges/components/ChallengeCategories";
import ChallengesMainSection from "@/features/challenges/components/ChallengesMainSection/ChallengesMainSection";
import ChallengeStats from "@/features/challenges/components/ChallengeStats/ChallengeStats";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Challenges",
};

export default async function ChallengesPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          <TranslatedText translationKey="challenges.title" fallback="Challenges" />
        }
        subtitle={
          <TranslatedText
            translationKey="challenges.subtitle"
            fallback="Test your skills, solve real problems and level up."
          />
        }
        action={{
          label: (
            <TranslatedText
              translationKey="challenges.createChallenge"
              fallback="Create Challenge"
            />
          ),
          icon: Plus,
        }}
      />
      <ChallengeBanner />
      <ChallengeStats />
      <ChallengeCategories />
      <ChallengesMainSection profile={profile} />
    </div>
  );
}
