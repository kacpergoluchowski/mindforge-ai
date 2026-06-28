"use client";

import { useFormStatus } from "react-dom";
import { Bot, Loader2 } from "lucide-react";

export default function AskAiMentorButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Bot className="size-4" />
      )}
      {pending ? "Opening AI Mentor..." : "Ask AI Mentor"}
    </button>
  );
}
