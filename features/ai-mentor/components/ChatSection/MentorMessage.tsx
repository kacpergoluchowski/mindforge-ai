import clsx from "clsx";
import { Bot, Bookmark, Copy, ThumbsDown, ThumbsUp } from "lucide-react";

type MentorMessageProps = {
  variant?: "default" | "welcome";
};

const messageActions = [
  { label: "Copy response", icon: Copy },
  { label: "Helpful response", icon: ThumbsUp },
  { label: "Unhelpful response", icon: ThumbsDown },
  { label: "Save response", icon: Bookmark },
];

export default function MentorMessage({
  variant = "default",
}: MentorMessageProps) {
  const isWelcome = variant === "welcome";

  return (
    <div className="flex min-w-0 gap-2 sm:gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-200 shadow-lg shadow-violet-950/30 sm:size-10">
        <Bot className="size-4 sm:size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={clsx(
            "max-w-full rounded-2xl border border-white/10 bg-[#141c31] px-4 py-3 text-sm leading-6 text-slate-200 shadow-lg shadow-slate-950/20 sm:px-5",
            isWelcome ? "max-w-lg" : "max-w-2xl"
          )}
        >
          {isWelcome ? (
            <>
              <p>Hi Kacper!</p>
              <p className="mt-1">
                I am your AI Mentor. What would you like to learn or discuss
                today?
              </p>
            </>
          ) : (
            <>
              <p>
                Of course. CSS Grid is a layout system that lets you create
                two-dimensional layouts on the web.
              </p>

              <p className="mt-3">Here is the simple idea:</p>
              <ul className="mt-1 list-inside list-disc">
                <li>You create a grid container</li>
                <li>You define rows and columns</li>
                <li>You place items inside the grid</li>
              </ul>

              <p className="mt-3">
                It gives you more control than Flexbox for complex layouts.
              </p>
            </>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          {!isWelcome
            ? messageActions.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-white/20 hover:text-white"
                >
                  <Icon className="size-4" />
                </button>
              ))
            : null}

          <span className="ml-1 text-xs text-slate-500 sm:ml-2">
            {isWelcome ? "10:30" : "10:31"}
          </span>
        </div>
      </div>
    </div>
  );
}
