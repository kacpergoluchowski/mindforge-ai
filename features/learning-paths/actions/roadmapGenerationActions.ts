"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  generateRoadmapPreview,
  generateRoadmapSuggestions,
} from "../api/generateRoadmapSuggestions";
import { createClient } from "@/lib/supabase/server";
import type {
  RoadmapPreviewState,
  RoadmapSuggestion,
  RoadmapSuggestionState,
  GeneratedRoadmapPreview,
} from "../types/learningPaths.types";

const MIN_GOAL_LENGTH = 2;
const MAX_GOAL_LENGTH = 160;

type SavedRoadmapResult = {
  learning_path_id?: string;
  learning_path_slug?: string;
};

export async function suggestRoadmapGoals(
  _previousState: RoadmapSuggestionState,
  formData: FormData
): Promise<RoadmapSuggestionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const goal = String(formData.get("goal") ?? "").trim();

  if (goal.length < MIN_GOAL_LENGTH) {
    return {
      error: "Enter a learning goal first.",
    };
  }

  if (goal.length > MAX_GOAL_LENGTH) {
    return {
      error: `Goal is too long. Limit is ${MAX_GOAL_LENGTH} characters.`,
    };
  }

  try {
    const suggestions = await generateRoadmapSuggestions(goal);

    return {
      normalizedGoal: goal,
      suggestions,
    };
  } catch {
    return {
      error: "AI suggestions are not available right now. Try again in a moment.",
    };
  }
}

export async function generateRoadmapPreviewAction(
  _previousState: RoadmapPreviewState,
  formData: FormData
): Promise<RoadmapPreviewState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const suggestion: RoadmapSuggestion = {
    id: String(formData.get("suggestionId") ?? "").trim(),
    title: String(formData.get("suggestionTitle") ?? "").trim(),
    description: String(formData.get("suggestionDescription") ?? "").trim(),
    level: String(formData.get("suggestionLevel") ?? "").trim(),
    focus: String(formData.get("suggestionFocus") ?? "").trim(),
  };

  if (!suggestion.id || !suggestion.title) {
    return {
      error: "Choose a roadmap suggestion first.",
    };
  }

  try {
    const preview = await generateRoadmapPreview(suggestion);

    return {
      preview,
      suggestionId: suggestion.id,
    };
  } catch {
    return {
      error: "Roadmap preview is not available right now. Try again in a moment.",
    };
  }
}

export async function saveGeneratedRoadmap(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const preview = parsePreviewPayload(String(formData.get("preview") ?? ""));

  if (!preview) {
    throw new Error("Missing roadmap preview.");
  }

  const slug = createRoadmapSlug(preview.title);
  const estimatedHours = parseEstimatedHours(preview.estimatedWeeks);
  const { data, error } = await supabase.rpc(
    "save_ai_generated_learning_path",
    {
      p_description: preview.description,
      p_estimated_hours: estimatedHours,
      p_level: preview.level,
      p_modules: preview.modules.map((module) => ({
        title: module.title,
        description: buildStepDescription(module.description, module.topics),
      })),
      p_slug: slug,
      p_title: preview.title,
    }
  );

  const savedPath = (Array.isArray(data) ? data[0] : data) as
    | SavedRoadmapResult
    | null;
  const pathSlug = savedPath?.learning_path_slug;

  if (error || !pathSlug) {
    console.error("Save generated roadmap failed:", error);
    throw new Error(
      error?.message
        ? `Could not save generated roadmap: ${error.message}`
        : "Could not save generated roadmap."
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/learning-paths");
  revalidatePath(`/learn/learning-paths/${pathSlug}`);
  redirect(`/learn/learning-paths/${pathSlug}`);
}

function parsePreviewPayload(value: string): GeneratedRoadmapPreview | null {
  try {
    const parsed = JSON.parse(value) as Partial<GeneratedRoadmapPreview>;
    const modules = Array.isArray(parsed.modules)
      ? parsed.modules
          .map((module) => ({
            title: normalizeText(module?.title),
            description: normalizeText(module?.description),
            topics: Array.isArray(module?.topics)
              ? module.topics.filter(
                  (topic): topic is string => typeof topic === "string"
                )
              : [],
          }))
          .filter((module) => module.title && module.description)
      : [];

    if (!parsed.title || !parsed.description || !modules.length) {
      return null;
    }

    return {
      title: normalizeText(parsed.title),
      description: normalizeText(parsed.description),
      level: normalizeText(parsed.level) || "Beginner",
      estimatedWeeks: normalizeText(parsed.estimatedWeeks) || "8-12 weeks",
      milestones: Array.isArray(parsed.milestones)
        ? parsed.milestones.filter(
            (milestone): milestone is string => typeof milestone === "string"
          )
        : [],
      modules,
    };
  } catch {
    return null;
  }
}

function createRoadmapSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "ai-generated-roadmap";
}

function parseEstimatedHours(estimatedWeeks: string): number {
  const weeks = estimatedWeeks.match(/\d+/)?.[0];
  const parsedWeeks = weeks ? Number(weeks) : 10;

  return Math.max(parsedWeeks, 1) * 6;
}

function buildStepDescription(description: string, topics: string[]): string {
  if (!topics.length) {
    return description;
  }

  return `${description} Topics: ${topics.join(", ")}.`;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
