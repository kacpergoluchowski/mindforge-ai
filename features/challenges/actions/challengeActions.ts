"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateAiMentorResponse } from "@/features/ai-mentor/api/generateAiMentorResponse";
import { createClient } from "@/lib/supabase/server";

const MAX_CHALLENGE_SOLUTION_LENGTH = 16000;

export async function startChallenge(formData: FormData) {
  const challengeId = String(formData.get("challengeId") ?? "");
  const challengeSlug = String(formData.get("challengeSlug") ?? "");

  if (!challengeId || !challengeSlug) {
    throw new Error("Missing challenge data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: challenge } = await supabase
    .from("challenges")
    .select("id, title")
    .eq("id", challengeId)
    .eq("slug", challengeSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const { data: existingChallenge } = await supabase
    .from("user_challenges")
    .select("id")
    .eq("profile_id", user.id)
    .eq("challenge_id", challengeId)
    .maybeSingle();

  if (!existingChallenge) {
    const { error } = await supabase.from("user_challenges").insert({
      profile_id: user.id,
      challenge_id: challengeId,
      status: "in_progress",
      progress_percent: 10,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error("Could not start challenge.");
    }

    await supabase.from("activity_logs").insert({
      profile_id: user.id,
      type: "challenge_started",
      title: `Started "${challenge.title}"`,
      description: "Challenge added to your practice list",
      metadata: {
        challenge_id: challengeId,
        challenge_slug: challengeSlug,
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/challenges");
  revalidatePath(`/learn/challenges/${challengeSlug}`);
}

export async function reviewChallengeSolution(formData: FormData) {
  const challengeId = String(formData.get("challengeId") ?? "");
  const solution = String(formData.get("solution") ?? "")
    .trim()
    .slice(0, MAX_CHALLENGE_SOLUTION_LENGTH);

  if (!challengeId || !solution) {
    throw new Error("Missing challenge solution.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: challenge }, { data: profile }] = await Promise.all([
    supabase
      .from("challenges")
      .select("id, title, description, difficulty, requirements, checklist")
      .eq("id", challengeId)
      .eq("is_published", true)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("full_name, username")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const feedback = await generateAiMentorResponse({
    history: [],
    userName: profile?.full_name ?? profile?.username,
    learningContext: [
      "Challenge solution review context from MindForge:",
      `Challenge: ${challenge.title}`,
      `Difficulty: ${challenge.difficulty}`,
      `Description: ${challenge.description}`,
      `Requirements: ${(challenge.requirements ?? []).join(", ") || "not specified"}`,
      `Acceptance criteria: ${(challenge.checklist ?? []).join(", ") || "not specified"}`,
    ].join("\n"),
    message: [
      "Review this challenge solution.",
      "Return clear, practical feedback.",
      "The first line must be plain text, no markdown, exactly one of these verdicts:",
      "Verdict: Passed",
      "or",
      "Verdict: Needs work",
      "",
      "Then include:",
      "1. What works",
      "2. What needs fixing",
      "3. Specific next steps",
      "4. Short note about whether the solution meets the acceptance criteria",
      "",
      "Be strict but beginner-friendly.",
      "",
      "Learner solution:",
      "```",
      solution,
      "```",
    ].join("\n"),
  });

  const verdict = getReviewVerdict(feedback);
  const now = new Date().toISOString();

  await supabase.from("user_challenges").upsert(
    {
      profile_id: user.id,
      challenge_id: challengeId,
      status: verdict === "passed" ? "submitted" : "in_progress",
      progress_percent: verdict === "passed" ? 80 : 40,
      solution_text: solution,
      ai_feedback: feedback,
      ai_verdict: verdict,
      reviewed_at: now,
      submitted_at: verdict === "passed" ? now : null,
      updated_at: now,
      started_at: now,
    },
    {
      onConflict: "profile_id,challenge_id",
      ignoreDuplicates: false,
    }
  );

  revalidatePath("/learn/challenges");

  return {
    feedback,
    verdict,
  };
}

export async function completeChallenge(formData: FormData) {
  const challengeId = String(formData.get("challengeId") ?? "");
  const solution = String(formData.get("solution") ?? "")
    .trim()
    .slice(0, MAX_CHALLENGE_SOLUTION_LENGTH);

  if (!challengeId) {
    throw new Error("Missing challenge data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: challenge } = await supabase
    .from("challenges")
    .select("id, slug, title, xp_reward")
    .eq("id", challengeId)
    .eq("is_published", true)
    .maybeSingle();

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  const { data: existingProgress } = await supabase
    .from("user_challenges")
    .select("id, status")
    .eq("profile_id", user.id)
    .eq("challenge_id", challengeId)
    .maybeSingle();

  if (existingProgress?.status === "completed") {
    return {
      completed: true,
      alreadyCompleted: true,
    };
  }

  const now = new Date().toISOString();

  const challengeProgressPayload = {
      profile_id: user.id,
      challenge_id: challengeId,
      status: "completed",
      progress_percent: 100,
      solution_text: solution || null,
      ai_verdict: "passed",
      submitted_at: now,
      completed_at: now,
      updated_at: now,
      ...(existingProgress ? {} : { started_at: now }),
    };

  const { error: progressError } = await supabase.from("user_challenges").upsert(
    challengeProgressPayload,
    {
      onConflict: "profile_id,challenge_id",
      ignoreDuplicates: false,
    }
  );

  if (progressError) {
    throw new Error("Could not complete challenge.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, streak_days, last_learning_date")
    .eq("id", user.id)
    .maybeSingle();
  const streak = getNextLearningStreak({
    lastLearningDate: profile?.last_learning_date ?? null,
    streakDays: profile?.streak_days ?? 0,
  });

  await supabase
    .from("profiles")
    .update({
      xp: (profile?.xp ?? 0) + challenge.xp_reward,
      streak_days: streak.days,
      last_learning_date: streak.date,
      updated_at: now,
    })
    .eq("id", user.id);

  await supabase.from("activity_logs").insert([
    {
      profile_id: user.id,
      type: "challenge_completed",
      title: `Completed "${challenge.title}"`,
      description: "Challenge solved",
      metadata: {
        challenge_id: challenge.id,
        challenge_slug: challenge.slug,
        xp_reward: challenge.xp_reward,
      },
    },
    {
      profile_id: user.id,
      type: "xp_earned",
      title: `Earned ${challenge.xp_reward} XP`,
      description: "for completing a challenge",
      metadata: {
        challenge_id: challenge.id,
        challenge_slug: challenge.slug,
        xp_reward: challenge.xp_reward,
      },
    },
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/learn/challenges");
  revalidatePath(`/learn/challenges/${challenge.slug}`);
  revalidatePath("/learn/progress");
  revalidatePath("/account/profile");

  return {
    completed: true,
    alreadyCompleted: false,
  };
}

type LearningStreakInput = {
  lastLearningDate: string | null;
  streakDays: number;
};

function getNextLearningStreak({
  lastLearningDate,
  streakDays,
}: LearningStreakInput) {
  const today = getDateKey(new Date());
  const yesterday = getDateKey(addDays(new Date(), -1));

  if (lastLearningDate === today) {
    return {
      date: today,
      days: streakDays,
    };
  }

  if (lastLearningDate === yesterday) {
    return {
      date: today,
      days: streakDays + 1,
    };
  }

  return {
    date: today,
    days: 1,
  };
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getReviewVerdict(feedback: string): "passed" | "needs_work" {
  const normalized = feedback
    .toLowerCase()
    .replaceAll("*", "")
    .replaceAll("_", "")
    .replaceAll("`", "")
    .replace(/\s+/g, " ")
    .trim();

  if (
    normalized.includes("verdict: needs work") ||
    normalized.startsWith("needs work") ||
    normalized.includes(" verdict needs work")
  ) {
    return "needs_work";
  }

  return "passed";
}
