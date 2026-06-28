export type CodeReviewLanguage =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs";

export type CodeReviewResult = {
  score: number;
  summary: string;
  issues: string[];
  suggestions: string[];
  improvedCode: string;
};

export type CodeReviewState = {
  error?: string;
  result?: CodeReviewResult;
};
