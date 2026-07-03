import { Bot, Code2, MessageSquareText } from "lucide-react";

import { mentorPrompts } from "../../data/landingPageData";
import LandingCtaLink from "./LandingCtaLink";
import LandingSectionHeader from "./LandingSectionHeader";

export default function MentorSection() {
  return (
    <section id="mentor" className="px-6 py-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/10 bg-[#0d1424] p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
        <div>
          <LandingSectionHeader
            eyebrow="AI Mentor"
            title="Get help exactly when you get stuck."
            subtitle="Ask questions about lessons, challenges, code, roadmaps and career decisions. MindForge uses your learning context to give better answers."
          />

          <div className="mt-8">
            <LandingCtaLink href="/ai-mentor/chat">
              Open AI Mentor
            </LandingCtaLink>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
              <Bot className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-white">MindForge AI Mentor</p>
              <p className="text-sm text-slate-500">Personal learning assistant</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="max-w-[82%] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
              Hi Kacper. What would you like to learn or debug today?
            </div>
            <div className="ml-auto max-w-[82%] rounded-2xl bg-violet-500 p-4 text-sm leading-6 text-white">
              Can you explain responsive design with a practical example?
            </div>
            <div className="max-w-[88%] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
              Sure. Start mobile-first, then add media queries when the layout
              needs more space. Build one column first, then expand to two or
              three columns on larger screens.
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {mentorPrompts.map((prompt) => (
              <div
                key={prompt}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300"
              >
                <Code2 className="mb-3 size-4 text-violet-300" />
                {prompt}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-500">
            <MessageSquareText className="size-4" />
            Ask anything about programming, career or learning...
          </div>
        </div>
      </div>
    </section>
  );
}
