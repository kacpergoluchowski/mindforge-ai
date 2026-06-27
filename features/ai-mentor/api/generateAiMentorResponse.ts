import OpenAI from "openai";

import type { AiChatMessage } from "../types/ai-mentor.types";

type GenerateAiMentorResponseParams = {
  message: string;
  history: AiChatMessage[];
  userName?: string | null;
};

const AI_MENTOR_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const MAX_HISTORY_MESSAGES = 10;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAiMentorResponse({
  message,
  history,
  userName,
}: GenerateAiMentorResponseParams): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "OpenAI API key is not configured yet. Add OPENAI_API_KEY to .env.local and restart the dev server.";
  }

  const response = await openai.responses.create({
    model: AI_MENTOR_MODEL,
    instructions: getAiMentorInstructions(userName),
    input: [
      ...history.slice(-MAX_HISTORY_MESSAGES).map((item) => ({
        role: item.role,
        content: item.content,
      })),
      {
        role: "user",
        content: message,
      },
    ],
    max_output_tokens: 700,
  });

  return (
    response.output_text?.trim() ??
    "I could not generate a response right now. Please try again."
  );
}

function getAiMentorInstructions(userName?: string | null): string {
  const learnerName = userName?.trim() || "the learner";

  return [
    `You are MindForge AI Mentor helping ${learnerName}.`,
    "You help with programming, learning plans, debugging, frontend, backend, career growth and course topics.",
    "Answer clearly and practically. Prefer short explanations, examples and next steps.",
    "If the user asks in Polish, answer in Polish. If the user asks in English, answer in English.",
    "Do not invent user progress or platform data. If you do not know something, say it directly.",
    "When explaining code, keep it beginner-friendly and show small examples when useful.",
  ].join(" ");
}
