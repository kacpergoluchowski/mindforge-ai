import { cache } from "react";
import {
  Braces,
  Code2,
  Database,
  Flame,
  LayoutDashboard,
  Medal,
  Network,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import { featuredChallenges } from "../data/challengesData";
import type {
  ChallengeColor,
  ChallengeDetail,
  ChallengeDifficulty,
  ChallengeStat,
  ChallengeStatus,
  FeaturedChallenge,
} from "../types/challenges.types";

type ChallengeRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  xp_reward: number;
  rating: number;
  participants_count: number;
  success_rate: number;
  icon: string;
  color: string;
  requirements?: string[] | null;
  checklist?: string[] | null;
  starter_code?: string | null;
  solution_notes?: string | null;
};

type UserChallengeRow = {
  challenge_id: string;
  status: string;
  progress_percent: number;
  solution_text?: string | null;
  ai_feedback?: string | null;
  ai_verdict?: "passed" | "needs_work" | null;
  challenges?: { xp_reward: number } | { xp_reward: number }[] | null;
};

type ChallengeProfileRow = {
  streak_days: number | null;
};

const challengeIcons: Record<string, LucideIcon> = {
  braces: Braces,
  code: Code2,
  database: Database,
  layout: LayoutDashboard,
  network: Network,
  shield: ShieldCheck,
};

const fallbackIcon = Code2;
const challengeColors: ChallengeColor[] = [
  "violet",
  "emerald",
  "sky",
  "orange",
  "yellow",
];
const challengeDifficulties: ChallengeDifficulty[] = [
  "Beginner",
  "Easy",
  "Medium",
  "Hard",
];

export const getFeaturedChallenges = cache(
  async (): Promise<FeaturedChallenge[]> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("challenges")
      .select(
        "id, slug, title, description, category, difficulty, duration_minutes, xp_reward, rating, participants_count, success_rate, icon, color"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(6);

    if (error || !data?.length) {
      return featuredChallenges;
    }

    const challengeRows = data as ChallengeRow[];
    const userChallengeResult = user
      ? await supabase
          .from("user_challenges")
          .select("challenge_id, status, progress_percent")
          .eq("profile_id", user.id)
          .in(
            "challenge_id",
            challengeRows.map((challenge) => challenge.id)
          )
      : null;

    const progressByChallenge = new Map(
      ((userChallengeResult?.data ?? []) as UserChallengeRow[]).map(
        (progress) => [
          progress.challenge_id,
          {
            status: progress.status as ChallengeStatus,
            progress: progress.progress_percent,
          },
        ]
      )
    );

    return challengeRows.map((challenge) =>
      mapFeaturedChallenge(challenge, progressByChallenge.get(challenge.id))
    );
  }
);

export const getChallengeBySlug = cache(
  async (slug: string): Promise<ChallengeDetail | null> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("challenges")
      .select(
        "id, slug, title, description, category, difficulty, duration_minutes, xp_reward, rating, participants_count, success_rate, icon, color, requirements, checklist, starter_code, solution_notes"
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const challenge = data as ChallengeRow;
    const userChallengeResult = user
      ? await supabase
          .from("user_challenges")
          .select(
            "challenge_id, status, progress_percent, solution_text, ai_feedback, ai_verdict"
          )
          .eq("profile_id", user.id)
          .eq("challenge_id", challenge.id)
          .maybeSingle()
      : null;
    const fallbackUserChallengeResult =
      user && userChallengeResult?.error
        ? await supabase
            .from("user_challenges")
            .select("challenge_id, status, progress_percent, solution_text")
            .eq("profile_id", user.id)
            .eq("challenge_id", challenge.id)
            .maybeSingle()
        : null;
    const progress = (userChallengeResult?.data ??
      fallbackUserChallengeResult?.data) as UserChallengeRow | null;

    return {
      ...mapFeaturedChallenge(
        challenge,
        progress
          ? {
              status: progress.status as ChallengeStatus,
              progress: progress.progress_percent,
            }
          : undefined
      ),
      requirements: challenge.requirements ?? [],
      checklist: challenge.checklist ?? [],
      starterCode: challenge.starter_code ?? null,
      solutionNotes: challenge.solution_notes ?? null,
      userSolution: progress?.solution_text ?? null,
      aiFeedback: progress?.ai_feedback ?? null,
      aiVerdict: progress?.ai_verdict ?? null,
      progress: progress?.progress_percent ?? 0,
    };
  }
);

export const getChallengeStats = cache(async (): Promise<ChallengeStat[]> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const [completedChallengesResult, profileResult] = await Promise.all([
    supabase
      .from("user_challenges")
      .select(
        `
        challenge_id,
        status,
        progress_percent,
        challenges (
          xp_reward
        )
      `
      )
      .eq("profile_id", user.id)
      .eq("status", "completed"),
    supabase
      .from("profiles")
      .select("streak_days")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  const completedChallenges =
    (completedChallengesResult.data as UserChallengeRow[] | null) ?? [];
  const profile = profileResult.data as ChallengeProfileRow | null;
  const solvedCount = completedChallenges.length;
  const challengeXp = completedChallenges.reduce((total, item) => {
    const challenge = getRelation(item.challenges);

    return total + (challenge?.xp_reward ?? 0);
  }, 0);

  return [
    {
      id: 1,
      title: "Challenges Solved",
      value: String(solvedCount),
      change: solvedCount > 0 ? `+${solvedCount}` : "+0",
      trend: "up",
      icon: Trophy,
      color: "violet",
    },
    {
      id: 2,
      title: "Current Streak",
      value: `${profile?.streak_days ?? 0} Days`,
      change: profile?.streak_days ? `+${profile.streak_days}` : "+0",
      trend: "up",
      icon: Flame,
      color: "orange",
    },
    {
      id: 3,
      title: "Challenge XP",
      value: String(challengeXp),
      change: challengeXp > 0 ? `+${challengeXp}` : "+0",
      trend: "up",
      icon: Star,
      color: "yellow",
    },
    {
      id: 4,
      title: "Current Rank",
      value: getChallengeRank(solvedCount),
      change: "Live",
      trend: "up",
      icon: Medal,
      color: "emerald",
    },
  ];
});

function mapFeaturedChallenge(
  challenge: ChallengeRow,
  progress?: { status: ChallengeStatus; progress: number }
): FeaturedChallenge {
  return {
    id: challenge.id,
    slug: challenge.slug,
    title: challenge.title,
    description: challenge.description,
    category: challenge.category,
    difficulty: getDifficulty(challenge.difficulty),
    points: challenge.xp_reward,
    rating: Number(challenge.rating),
    participants: formatParticipants(challenge.participants_count),
    successRate: `${challenge.success_rate}%`,
    icon: challengeIcons[challenge.icon] ?? fallbackIcon,
    color: getColor(challenge.color),
    duration: formatDuration(challenge.duration_minutes),
    status: progress?.status ?? null,
  };
}

function getDifficulty(value: string): ChallengeDifficulty {
  return challengeDifficulties.includes(value as ChallengeDifficulty)
    ? (value as ChallengeDifficulty)
    : "Beginner";
}

function getColor(value: string): ChallengeColor {
  return challengeColors.includes(value as ChallengeColor)
    ? (value as ChallengeColor)
    : "violet";
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatParticipants(participants: number): string {
  if (participants >= 1000) {
    return `${(participants / 1000).toFixed(1)}k`;
  }

  return String(participants);
}

function getRelation<T>(relation: T | T[] | null | undefined) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}

function getChallengeRank(solvedCount: number): string {
  if (solvedCount >= 50) {
    return "Diamond";
  }

  if (solvedCount >= 25) {
    return "Platinum";
  }

  if (solvedCount >= 10) {
    return "Gold";
  }

  if (solvedCount >= 5) {
    return "Silver";
  }

  if (solvedCount >= 1) {
    return "Bronze";
  }

  return "Starter";
}
