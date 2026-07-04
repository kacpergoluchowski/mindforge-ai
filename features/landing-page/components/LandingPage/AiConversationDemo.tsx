"use client";

import { useEffect, useState } from "react";
import { Bot, Code2, MessageSquareText } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import {
  aiMentorDemoMessages,
  mentorPrompts,
} from "../../data/landingPageData";

const TYPING_DURATION_MS = 1400;
const ANSWER_DURATION_MS = 4300;

// Interaktywne demo AI działa lokalnie na froncie i nie odpytuje API.
// Dzięki temu landing page jest szybki, tani w utrzymaniu i pokazuje ideę produktu.
export default function AiConversationDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const activeMessage = aiMentorDemoMessages[messageIndex];
  const showTypingState = shouldReduceMotion ? false : isTyping;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    // Najpierw pokazujemy typing state, potem odpowiedź i przechodzimy do kolejnego promptu.
    const typingTimer = window.setTimeout(() => {
      setIsTyping(false);
    }, TYPING_DURATION_MS);

    const nextMessageTimer = window.setTimeout(() => {
      setIsTyping(true);
      setMessageIndex(
        (currentIndex) => (currentIndex + 1) % aiMentorDemoMessages.length
      );
    }, TYPING_DURATION_MS + ANSWER_DURATION_MS);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(nextMessageTimer);
    };
  }, [messageIndex, shouldReduceMotion]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
          <Bot className="size-5" />
        </div>
        <div>
          <p className="font-semibold text-white">MindForge AI Mentor</p>
          <p className="text-sm text-slate-500">Live learning preview</p>
        </div>
      </div>

      {/* aria-live sprawia, że zmiana odpowiedzi może zostać ogłoszona przez czytnik ekranu. */}
      <div className="mt-5 min-h-[268px] space-y-4">
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.div
              key={activeMessage.question}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="ml-auto max-w-[84%] rounded-2xl bg-violet-500 p-4 text-sm leading-6 text-white shadow-[0_0_28px_rgba(139,92,246,0.22)]">
                {activeMessage.question}
              </div>

              <div
                aria-live="polite"
                className="max-w-[88%] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300"
              >
                {showTypingState ? (
                  <TypingIndicator />
                ) : (
                  <m.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeMessage.answer}
                  </m.p>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {mentorPrompts.map((prompt) => (
          <div
            key={prompt}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300"
          >
            <Code2 aria-hidden="true" className="mb-3 size-4 text-violet-300" />
            {prompt}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-500">
        <MessageSquareText aria-hidden="true" className="size-4" />
        Ask anything about programming, career or learning...
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    // role="status" informuje technologie wspomagające, że AI aktualnie "pisze".
    <div
      role="status"
      aria-label="AI is typing"
      className="flex items-center gap-3 text-slate-400"
    >
      <span>AI typing</span>
      <span aria-hidden="true" className="flex gap-1.5">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="size-1.5 animate-pulse rounded-full bg-violet-300"
            style={{ animationDelay: `${item * 140}ms` }}
          />
        ))}
      </span>
    </div>
  );
}
