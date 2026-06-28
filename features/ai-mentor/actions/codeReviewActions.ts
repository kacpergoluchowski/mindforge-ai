"use server";

import { redirect } from "next/navigation";

import { reviewCode } from "@/features/ai-mentor/api/reviewCode";
import { createClient } from "@/lib/supabase/server";

import type {
  CodeReviewLanguage,
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

  const code = String(formData.get("code") ?? "").trim();
  const language = getCodeReviewLanguage(String(formData.get("language") ?? ""));

  if (!code) {
    return {
      error: "Paste code before running review.",
    };
  }

  if (code.length > MAX_CODE_LENGTH) {
    return {
      error: `Code is too long. Limit is ${MAX_CODE_LENGTH} characters for this MVP.`,
    };
  }

  try {
    const result = await reviewCode({
      code,
      language,
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

function getCodeReviewLanguage(value: string): CodeReviewLanguage {
  return codeReviewLanguages.includes(value as CodeReviewLanguage)
    ? (value as CodeReviewLanguage)
    : "javascript";
}
