"use server";

import { redirect } from "next/navigation";

import { generateAiMentorResponse } from "@/features/ai-mentor/api/generateAiMentorResponse";
import { getAiMentorLearningContext } from "@/features/ai-mentor/api/getAiMentorLearningContext";
import { createClient } from "@/lib/supabase/server";

export type StudyAssistantMode = "plan" | "review" | "stuck";
type StudyAssistantLocale = "en" | "pl";

export type StudyAssistantState = {
  error?: string;
  mode?: StudyAssistantMode;
  response?: string;
};

type ProfileRow = {
  full_name: string | null;
  username: string | null;
};

const MAX_PROBLEM_LENGTH = 1200;

export async function generateStudyAssistantResponse(
  _previousState: StudyAssistantState,
  formData: FormData
): Promise<StudyAssistantState> {
  const mode = getStudyAssistantMode(String(formData.get("mode") ?? ""));
  const locale = getStudyAssistantLocale(String(formData.get("locale") ?? ""));
  const problem = String(formData.get("problem") ?? "")
    .trim()
    .slice(0, MAX_PROBLEM_LENGTH);

  if (!mode) {
    return { error: getStudyAssistantError(locale, "unknownMode") };
  }

  if (mode === "stuck" && problem.length < 10) {
    return {
      error: getStudyAssistantError(locale, "shortProblem"),
      mode,
    };
  }

  const supabase = await createClient();
  let userId: string | null = null;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userId = user?.id ?? null;
  } catch {
    return {
      error: getStudyAssistantError(locale, "unavailable"),
      mode,
    };
  }

  if (!userId) {
    redirect("/login");
  }

  try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, username")
      .eq("id", userId)
      .maybeSingle();

    const profile = profileData as ProfileRow | null;
    const learningContext = await getAiMentorLearningContext(userId);
    const response = await generateAiMentorResponse({
      history: [],
      learningContext,
      message: getStudyAssistantPrompt(mode, problem, locale),
      userName: profile?.full_name ?? profile?.username,
    });

    return {
      mode,
      response,
    };
  } catch {
    return {
      error: getStudyAssistantError(locale, "unavailable"),
      mode,
    };
  }
}

function getStudyAssistantMode(value: string): StudyAssistantMode | null {
  if (value === "plan" || value === "review" || value === "stuck") {
    return value;
  }

  return null;
}

function getStudyAssistantLocale(value: string): StudyAssistantLocale {
  return value === "pl" ? "pl" : "en";
}

function getStudyAssistantPrompt(
  mode: StudyAssistantMode,
  problem: string,
  locale: StudyAssistantLocale
): string {
  const languageInstruction =
    locale === "pl" ? "Odpowiedz po polsku." : "Answer in English.";

  if (mode === "plan") {
    return [
      languageInstruction,
      "Prepare a concrete study plan for today based on my current learning context.",
      "The plan must be practical, short and possible to complete today.",
      "Include: main goal, 3-5 tasks, suggested time, priority and one short tip for keeping my streak.",
    ].join(" ");
  }

  if (mode === "review") {
    return [
      languageInstruction,
      "Prepare a review session based on my recent lessons.",
      "Generate 5 check questions, short answers and 2 small practical tasks.",
      "Focus on concepts worth reinforcing before I move forward.",
    ].join(" ");
  }

  return [
    languageInstruction,
    "Help me unblock a programming learning problem.",
    `My problem: ${problem}`,
    "First name the likely cause, then explain the topic simply, give a step-by-step fix plan and one small exercise.",
  ].join(" ");
}

function getStudyAssistantError(
  locale: StudyAssistantLocale,
  key: "shortProblem" | "unavailable" | "unknownMode"
): string {
  const messages: Record<StudyAssistantLocale, Record<typeof key, string>> = {
    en: {
      shortProblem: "Briefly describe what you are stuck on.",
      unavailable: "Study Assistant is not available right now. Try again soon.",
      unknownMode: "Unknown assistant mode.",
    },
    pl: {
      shortProblem: "Opisz krótko, z czym masz problem.",
      unavailable:
        "Asystent nauki jest teraz niedostępny. Spróbuj ponownie za chwilę.",
      unknownMode: "Nieznany tryb asystenta.",
    },
  };

  return messages[locale][key];
}
