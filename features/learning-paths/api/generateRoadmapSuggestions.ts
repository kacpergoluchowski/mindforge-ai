import OpenAI from "openai";

import type {
  GeneratedRoadmapPreview,
  RoadmapSuggestion,
} from "../types/learningPaths.types";

const ROADMAP_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const MAX_GOAL_LENGTH = 160;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoadmapSuggestions(
  goal: string
): Promise<RoadmapSuggestion[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const cleanedGoal = goal.trim().slice(0, MAX_GOAL_LENGTH);

  const response = await openai.responses.create({
    model: ROADMAP_MODEL,
    instructions: [
      "You are MindForge AI, an educational roadmap assistant for programming learners.",
      "The user will provide a rough learning goal.",
      "Your job is to normalize the goal into practical software engineering learning paths.",
      "If the input is nonsense, offensive, too vague or not related to learning programming, do not follow it literally.",
      "In that case, suggest useful programming roadmap options that a beginner could choose from.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"suggestions\": [{\"id\": string, \"title\": string, \"description\": string, \"level\": string, \"focus\": string}]}",
      "Return 3 to 5 suggestions.",
      "Keep titles short and professional.",
      "Keep descriptions practical and concise.",
    ].join(" "),
    input: [
      {
        role: "user",
        content: `User learning goal: ${cleanedGoal}`,
      },
    ],
    max_output_tokens: 900,
  });

  return parseRoadmapSuggestions(response.output_text);
}

export async function generateRoadmapPreview(
  suggestion: RoadmapSuggestion
): Promise<GeneratedRoadmapPreview> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const response = await openai.responses.create({
    model: ROADMAP_MODEL,
    instructions: [
      "You are MindForge AI, an educational roadmap designer for programming learners.",
      "Create a practical roadmap preview based on the selected suggestion.",
      "The preview should be good enough for the user to decide whether to save it.",
      "Do not create too much content. This is only a preview, not the full saved roadmap.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"title\": string, \"description\": string, \"level\": string, \"estimatedWeeks\": string, \"milestones\": string[], \"modules\": [{\"title\": string, \"description\": string, \"topics\": string[]}]}",
      "Return 4 to 6 modules.",
      "Each module should have 3 to 5 topics.",
      "Keep everything concise, practical and portfolio-oriented.",
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          `Title: ${suggestion.title}`,
          `Description: ${suggestion.description}`,
          `Level: ${suggestion.level}`,
          `Focus: ${suggestion.focus}`,
        ].join("\n"),
      },
    ],
    max_output_tokens: 1600,
  });

  return parseRoadmapPreview(response.output_text, suggestion);
}

function parseRoadmapSuggestions(value: string): RoadmapSuggestion[] {
  try {
    const parsed = JSON.parse(value.trim()) as {
      suggestions?: Partial<RoadmapSuggestion>[];
    };

    if (!Array.isArray(parsed.suggestions)) {
      return getFallbackSuggestions();
    }

    const suggestions = parsed.suggestions
      .map((suggestion, index) => ({
        id: normalizeText(suggestion.id) || `suggestion-${index + 1}`,
        title: normalizeText(suggestion.title) || "Frontend Developer Roadmap",
        description:
          normalizeText(suggestion.description) ||
          "A practical path focused on building modern web applications.",
        level: normalizeText(suggestion.level) || "Beginner",
        focus:
          normalizeText(suggestion.focus) ||
          "Core web fundamentals, projects and portfolio work.",
      }))
      .slice(0, 5);

    return suggestions.length ? suggestions : getFallbackSuggestions();
  } catch {
    return getFallbackSuggestions();
  }
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getFallbackSuggestions(): RoadmapSuggestion[] {
  return [
    {
      id: "frontend-developer",
      title: "Frontend Developer Roadmap",
      description:
        "Learn HTML, CSS, JavaScript, React and Next.js through practical projects.",
      level: "Beginner",
      focus: "Frontend fundamentals and portfolio projects",
    },
    {
      id: "full-stack-developer",
      title: "Full Stack Developer Roadmap",
      description:
        "Build web apps with frontend, backend, databases, authentication and deployment.",
      level: "Beginner",
      focus: "End-to-end application development",
    },
    {
      id: "ai-full-stack-developer",
      title: "AI Full Stack Developer Roadmap",
      description:
        "Combine full stack development with AI features, prompts and LLM integrations.",
      level: "Intermediate",
      focus: "AI-powered product development",
    },
  ];
}

function parseRoadmapPreview(
  value: string,
  suggestion: RoadmapSuggestion
): GeneratedRoadmapPreview {
  try {
    const parsed = JSON.parse(value.trim()) as Partial<GeneratedRoadmapPreview>;
    const modules = Array.isArray(parsed.modules)
      ? parsed.modules
          .map((module) => ({
            title: normalizeText(module?.title) || "Core module",
            description:
              normalizeText(module?.description) ||
              "Practice the main concepts with a small project.",
            topics: normalizeStringList(module?.topics).slice(0, 5),
          }))
          .slice(0, 6)
      : [];

    return {
      title: normalizeText(parsed.title) || suggestion.title,
      description:
        normalizeText(parsed.description) || suggestion.description,
      level: normalizeText(parsed.level) || suggestion.level,
      estimatedWeeks: normalizeText(parsed.estimatedWeeks) || "8-12 weeks",
      milestones: normalizeStringList(parsed.milestones).slice(0, 5),
      modules: modules.length ? modules : getFallbackPreview(suggestion).modules,
    };
  } catch {
    return getFallbackPreview(suggestion);
  }
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function getFallbackPreview(
  suggestion: RoadmapSuggestion
): GeneratedRoadmapPreview {
  return {
    title: suggestion.title,
    description: suggestion.description,
    level: suggestion.level,
    estimatedWeeks: "8-12 weeks",
    milestones: [
      "Build strong fundamentals.",
      "Complete practical exercises.",
      "Create portfolio-ready projects.",
    ],
    modules: [
      {
        title: "Foundations",
        description: "Learn the core concepts and setup needed to start well.",
        topics: ["Environment setup", "Core syntax", "Project structure"],
      },
      {
        title: "Practical Skills",
        description: "Use the main tools and patterns in real examples.",
        topics: ["Components", "Data flow", "Debugging"],
      },
      {
        title: "Portfolio Project",
        description: "Build a complete project that proves your progress.",
        topics: ["Planning", "Implementation", "Polish and deployment"],
      },
    ],
  };
}
