"use server";

import { redirect } from "next/navigation";

import { generateAiMentorResponse } from "@/features/ai-mentor/api/generateAiMentorResponse";
import { getAiMentorLearningContext } from "@/features/ai-mentor/api/getAiMentorLearningContext";
import { createClient } from "@/lib/supabase/server";

export type StudyAssistantMode = "plan" | "review" | "stuck";

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
  const mode = String(formData.get("mode") ?? "") as StudyAssistantMode;
  const problem = String(formData.get("problem") ?? "")
    .trim()
    .slice(0, MAX_PROBLEM_LENGTH);

  if (!isStudyAssistantMode(mode)) {
    return { error: "Nieznany typ asystenta." };
  }

  if (mode === "stuck" && problem.length < 10) {
    return {
      error: "Opisz krótko, z czym masz problem.",
      mode,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("full_name, username")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileData as ProfileRow | null;
  const learningContext = await getAiMentorLearningContext(user.id);
  const response = await generateAiMentorResponse({
    history: [],
    learningContext,
    message: getStudyAssistantPrompt(mode, problem),
    userName: profile?.full_name ?? profile?.username,
  });

  return {
    mode,
    response,
  };
}

function isStudyAssistantMode(value: string): value is StudyAssistantMode {
  return value === "plan" || value === "review" || value === "stuck";
}

function getStudyAssistantPrompt(
  mode: StudyAssistantMode,
  problem: string
): string {
  if (mode === "plan") {
    return [
      "Odpowiedz po polsku.",
      "Na podstawie mojego aktualnego kontekstu nauki przygotuj konkretny plan nauki na dziś.",
      "Plan ma być praktyczny, krótki i możliwy do wykonania.",
      "Uwzględnij: główny cel, 3-5 zadań, sugerowany czas, priorytet i krótką wskazówkę jak utrzymać streak.",
    ].join(" ");
  }

  if (mode === "review") {
    return [
      "Odpowiedz po polsku.",
      "Na podstawie moich ostatnich lekcji przygotuj sesję powtórkową.",
      "Wygeneruj 5 pytań kontrolnych, krótkie odpowiedzi oraz 2 mini zadania praktyczne.",
      "Skup się na rzeczach, które warto utrwalić przed przejściem dalej.",
    ].join(" ");
  }

  return [
    "Odpowiedz po polsku.",
    "Pomóż mi odblokować problem w nauce programowania.",
    `Mój problem: ${problem}`,
    "Najpierw nazwij możliwą przyczynę problemu, potem wyjaśnij temat prosto, daj plan naprawy krok po kroku i jedno małe ćwiczenie.",
  ].join(" ");
}
