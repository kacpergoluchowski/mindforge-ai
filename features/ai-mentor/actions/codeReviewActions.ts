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
  const mode = getCodeReviewMode(String(formData.get("mode") ?? ""));
  const code = String(formData.get("code") ?? "").trim();
  const language = getCodeReviewLanguage(String(formData.get("language") ?? ""));
  const locale = getCodeReviewLocale(String(formData.get("locale") ?? ""));

  let isAuthenticated = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isAuthenticated = Boolean(user);
  } catch {
    return {
      error: getReviewErrorMessage(locale, "unavailable"),
    };
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  if (!code) {
    return {
      error: getReviewErrorMessage(
        locale,
        mode === "project" ? "emptyProject" : "emptyCode"
      ),
    };
  }

  if (mode === "project" && code.length > MAX_PROJECT_LENGTH) {
    return {
      error: getReviewErrorMessage(locale, "projectTooLong"),
    };
  }

  if (mode === "single-file" && code.length > MAX_CODE_LENGTH) {
    return {
      error: getReviewErrorMessage(locale, "codeTooLong"),
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
      error: getReviewErrorMessage(locale, "unavailable"),
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

function getReviewErrorMessage(
  locale: CodeReviewLocale,
  key:
    | "codeTooLong"
    | "emptyCode"
    | "emptyProject"
    | "projectTooLong"
    | "unavailable"
): string {
  const messages: Record<CodeReviewLocale, Record<typeof key, string>> = {
    en: {
      codeTooLong: `Code is too long. Limit is ${MAX_CODE_LENGTH} characters.`,
      emptyCode: "Paste code before running review.",
      emptyProject: "Paste project structure or files before running review.",
      projectTooLong: `Project input is too long. Limit is ${MAX_PROJECT_LENGTH} characters.`,
      unavailable: "Code review is not available right now. Try again in a moment.",
    },
    pl: {
      codeTooLong: `Kod jest za długi. Limit to ${MAX_CODE_LENGTH} znaków.`,
      emptyCode: "Wklej kod przed uruchomieniem review.",
      emptyProject: "Wklej strukturę projektu albo pliki przed review.",
      projectTooLong: `Opis projektu jest za długi. Limit to ${MAX_PROJECT_LENGTH} znaków.`,
      unavailable:
        "Code review jest teraz niedostępne. Spróbuj ponownie za chwilę.",
    },
  };

  return messages[locale][key];
}
