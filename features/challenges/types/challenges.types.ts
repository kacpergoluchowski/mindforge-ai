import type { LucideIcon } from "lucide-react";

export type ChallengeDifficulty = "Beginner" | "Easy" | "Medium" | "Hard";
export type ChallengeColor = "violet" | "emerald" | "sky" | "orange" | "yellow";
export type ChallengeStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "completed";

export type ChallengeStatCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "violet" | "orange" | "yellow" | "emerald";
};

export type ChallengeStat = ChallengeStatCardProps & {
  id: number;
};

export type FeaturedChallengeCardProps = {
  slug?: string;
  title: string;
  description: string;
  category: string;
  difficulty: ChallengeDifficulty;
  points: number;
  rating: number;
  participants: string;
  successRate: string;
  icon: LucideIcon;
  color: ChallengeColor;
  duration?: string;
  status?: ChallengeStatus | null;
};

export type FeaturedChallenge = FeaturedChallengeCardProps & {
  id: string | number;
  slug: string;
};

export type ChallengeDetail = FeaturedChallenge & {
  requirements: string[];
  checklist: string[];
  starterCode: string | null;
  solutionNotes: string | null;
  userSolution: string | null;
  aiFeedback: string | null;
  aiVerdict: "passed" | "needs_work" | null;
  progress: number;
};
