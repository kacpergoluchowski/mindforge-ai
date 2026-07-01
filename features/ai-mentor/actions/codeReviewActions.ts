"use server";

import { redirect } from "next/navigation";

import {
  reviewCode,
  reviewProject,
} from "@/features/ai-mentor/api/reviewCode";
import { createClient } from "@/lib/supabase/server";

import type {
  CodeReviewLanguage,
  CodeReviewLocale,
  CodeReviewMode,
  CodeReviewState,
} from "../types/code-review.types";

const codeReviewLanguages: CodeReviewLanguage[] = [
  "html",
  "css",
  "javascript",
  "typescript",
  "react",
  "nextjs",
];
const MAX_CODE_LENGTH = 12000;
const MAX_PROJECT_LENGTH = 30000;

export async function reviewCodeAction(
  _previousState: CodeReviewState,
  formData: FormData
): Promise<CodeReviewState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const mode = getCodeReviewMode(String(formData.get("mode") ?? ""));
  const code = String(formData.get("code") ?? "").trim();
  const language = getCodeReviewLanguage(String(formData.get("language") ?? ""));
  const locale = getCodeReviewLocale(String(formData.get("locale") ?? ""));

  if (!code) {
    return {
      error:
        mode === "project"
          ? "Paste project structure or files before running review."
          : "Paste code before running review.",
    };
  }

  if (mode === "project" && code.length > MAX_PROJECT_LENGTH) {
    return {
      error: `Project review input is too long. Limit is ${MAX_PROJECT_LENGTH} characters for this MVP.`,
    };
  }

  if (mode === "single-file" && code.length > MAX_CODE_LENGTH) {
    return {
      error: `Code is too long. Limit is ${MAX_CODE_LENGTH} characters for this MVP.`,
    };
  }

  try {
    const result =
      mode === "project"
        ? await reviewProject({ locale, project: code })
        : await reviewCode({
            code,
            language,
            locale,
          });

    return {
      result,
    };
  } catch {
    return {
      error: "Code review is not available right now. Try again in a moment.",
    };
  }
}

function getCodeReviewMode(value: string): CodeReviewMode {
  return value === "project" ? "project" : "single-file";
}

function getCodeReviewLanguage(value: string): CodeReviewLanguage {
  return codeReviewLanguages.includes(value as CodeReviewLanguage)
    ? (value as CodeReviewLanguage)
    : "javascript";
}

function getCodeReviewLocale(value: string): CodeReviewLocale {
  return value === "pl" ? "pl" : "en";
}
