import type { LucideIcon } from "lucide-react";

export type ChallengeStatCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: "violet" | "orange" | "yellow" | "emerald";
};

export type FeaturedChallengeCardProps = {
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  rating: number;
  participants: string;
  successRate: string;
  icon: LucideIcon;
  color: "violet" | "emerald" | "sky" | "orange" | "yellow";
};
