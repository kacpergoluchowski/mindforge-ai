export type CodeReviewLanguage =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs";

export type CodeReviewMode = "single-file" | "project";

export type CodeReviewLocale = "en" | "pl";

export type CodeReviewResult = {
  mode: "single-file";
  score: number;
  summary: string;
  issues: string[];
  suggestions: string[];
  improvedCode: string;
};

export type ProjectReviewResult = {
  mode: "project";
  score: number;
  summary: string;
  structure: string[];
  codeQuality: string[];
  risks: string[];
  suggestedRefactor: string[];
  nextSteps: string[];
};

export type CodeReviewState = {
  error?: string;
  result?: CodeReviewResult | ProjectReviewResult;
};
