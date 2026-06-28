import OpenAI from "openai";

import type {
  CodeReviewLanguage,
  CodeReviewResult,
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

function parseCodeReviewResult(value: string): CodeReviewResult {
  try {
    const parsed = JSON.parse(value.trim()) as Partial<CodeReviewResult>;

    return {
      score: normalizeScore(parsed.score),
      summary: parsed.summary ?? "Code review completed.",
      issues: normalizeList(parsed.issues),
      suggestions: normalizeList(parsed.suggestions),
      improvedCode: parsed.improvedCode ?? "",
    };
  } catch {
    return {
      score: 5,
      summary: "AI returned a response, but it could not be parsed cleanly.",
      issues: ["Could not parse the structured code review response."],
      suggestions: ["Try again with a smaller code sample."],
      improvedCode: value.trim(),
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
