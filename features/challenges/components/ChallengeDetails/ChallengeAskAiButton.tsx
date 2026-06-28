"use client";

import { useFormStatus } from "react-dom";
import { Bot, Loader2 } from "lucide-react";

export default function ChallengeAskAiButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 font-semibold text-violet-300 transition hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Bot className="size-4" />
      )}
      {pending ? "Opening AI Mentor..." : "Ask AI"}
    </button>
  );
}
