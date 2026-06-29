import OpenAI from "openai";

import type {
  CodeReviewLanguage,
  CodeReviewResult,
  ProjectReviewResult,
} from "../types/code-review.types";

const CODE_REVIEW_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function reviewCode({
  code,
  language,
}: {
  code: string;
  language: CodeReviewLanguage;
}): Promise<CodeReviewResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const response = await openai.responses.create({
    model: CODE_REVIEW_MODEL,
    instructions: [
      "You are a senior software engineer reviewing code for a beginner/intermediate developer.",
      "Focus on correctness, readability, structure, maintainability, accessibility and practical improvements.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"score\": number, \"summary\": string, \"issues\": string[], \"suggestions\": string[], \"improvedCode\": string}",
      "Score must be from 1 to 10.",
      "Keep issues and suggestions concise.",
      "Improved code should be a cleaned up version of the submitted code, not a different project.",
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          `Language or framework: ${language}`,
          "Review this code and return the JSON result:",
          code,
        ].join("\n\n"),
      },
    ],
    max_output_tokens: 2500,
  });

  return parseCodeReviewResult(response.output_text);
}

export async function reviewProject({
  project,
}: {
  project: string;
}): Promise<ProjectReviewResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const response = await openai.responses.create({
    model: CODE_REVIEW_MODEL,
    instructions: [
      "You are a senior full-stack engineer reviewing a beginner/intermediate project.",
      "Focus on architecture, folder structure, naming, separation of concerns, duplicated code, maintainability, security risks and practical refactor steps.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"score\": number, \"summary\": string, \"structure\": string[], \"codeQuality\": string[], \"risks\": string[], \"suggestedRefactor\": string[], \"nextSteps\": string[]}",
      "Score must be from 1 to 10.",
      "Keep all list items concise and practical.",
      "Do not rewrite the whole project. Return a review report only.",
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          "Review this project structure and code sample. It may contain folder trees, multiple files, or pasted snippets.",
          project,
        ].join("\n\n"),
      },
    ],
    max_output_tokens: 2500,
  });

  return parseProjectReviewResult(response.output_text);
}

function parseCodeReviewResult(value: string): CodeReviewResult {
  try {
    const parsed = JSON.parse(value.trim()) as Partial<CodeReviewResult>;

    return {
      mode: "single-file",
      score: normalizeScore(parsed.score),
      summary: parsed.summary ?? "Code review completed.",
      issues: normalizeList(parsed.issues),
      suggestions: normalizeList(parsed.suggestions),
      improvedCode: parsed.improvedCode ?? "",
    };
  } catch {
    return {
      mode: "single-file",
      score: 5,
      summary: "AI returned a response, but it could not be parsed cleanly.",
      issues: ["Could not parse the structured code review response."],
      suggestions: ["Try again with a smaller code sample."],
      improvedCode: value.trim(),
    };
  }
}

function parseProjectReviewResult(value: string): ProjectReviewResult {
  try {
    const parsed = JSON.parse(value.trim()) as Partial<ProjectReviewResult>;

    return {
      mode: "project",
      score: normalizeScore(parsed.score),
      summary: parsed.summary ?? "Project review completed.",
      structure: normalizeList(parsed.structure),
      codeQuality: normalizeList(parsed.codeQuality),
      risks: normalizeList(parsed.risks),
      suggestedRefactor: normalizeList(parsed.suggestedRefactor),
      nextSteps: normalizeList(parsed.nextSteps),
    };
  } catch {
    return {
      mode: "project",
      score: 5,
      summary: "AI returned a response, but it could not be parsed cleanly.",
      structure: [],
      codeQuality: [],
      risks: ["Could not parse the structured project review response."],
      suggestedRefactor: ["Try again with a smaller project sample."],
      nextSteps: [value.trim()],
    };
  }
}

function normalizeScore(score: unknown): number {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return 5;
  }

  return Math.min(Math.max(Math.round(score), 1), 10);
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}
