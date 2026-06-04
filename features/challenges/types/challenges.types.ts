import { LucideIcon } from "lucide-react";

export type ChallengeStatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "violet" | "orange" | "yellow" | "emerald";
};

export type FeaturedChallengeCardProps = {
  title: string;
  category: string;
  difficulty: string;
  points: number;
  time: string;
  icon: LucideIcon;
  color: "violet" | "emerald" | "sky";
};

export type Props = {
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