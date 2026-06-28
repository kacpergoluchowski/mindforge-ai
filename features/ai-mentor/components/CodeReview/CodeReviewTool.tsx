"use client";

import { useActionState, useLayoutEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  CheckCircle2,
  Code2,
  Download,
  FileCode2,
  Lightbulb,
  Loader2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { reviewCodeAction } from "../../actions/codeReviewActions";
import type {
  CodeReviewResult,
  CodeReviewState,
} from "../../types/code-review.types";

const languageOptions = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
];

const initialState: CodeReviewState = {};

export default function CodeReviewTool() {
  const [state, formAction] = useActionState(reviewCodeAction, initialState);
  const result = state.result;
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [improvedCodeHeight, setImprovedCodeHeight] = useState<number | null>(
    null
  );

  useLayoutEffect(() => {
    if (!result) {
      return;
    }

    const updateHeight = () => {
      const formHeight = formRef.current?.getBoundingClientRect().height ?? 0;
      const summaryHeight =
        summaryRef.current?.getBoundingClientRect().height ?? 0;
      const gap = 24;
      const nextHeight = Math.max(
        280,
        Math.round(summaryHeight - formHeight - gap)
      );

      setImprovedCodeHeight(nextHeight);
    };

    const frameId = window.requestAnimationFrame(updateHeight);

    const resizeObserver = new ResizeObserver(updateHeight);

    if (formRef.current) {
      resizeObserver.observe(formRef.current);
    }

    if (summaryRef.current) {
      resizeObserver.observe(summaryRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [result]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424]">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 bg-white/[0.02] p-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
              <Sparkles className="size-4" />
              AI Code Review
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Review your code
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Paste a component or file. MindForge checks readability,
              structure, bugs and returns a cleaner version.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <HeaderStat label="Limit" value="12k" />
            <HeaderStat label="Mode" value="AI" />
            <HeaderStat label="Output" value="Clean" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0 space-y-6">
          <form
            ref={formRef}
            action={formAction}
            className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  <FileCode2 className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Code input</h2>
                  <p className="text-xs text-slate-500">
                    Paste one file or component
                  </p>
                </div>
              </div>

              <select
                name="language"
                defaultValue="javascript"
                className="h-10 rounded-xl border border-white/10 bg-[#080e18] px-3 text-sm text-slate-200 outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="code"
              spellCheck={false}
              placeholder="Paste your code here..."
              className={clsx(
                "w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600",
                result ? "min-h-[220px]" : "min-h-[560px]"
              )}
            />

            <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/20 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Best for single files, components and small snippets.
              </p>
              <SubmitButton />
            </div>
          </form>

          {result ? (
            <ImprovedCodePanel
              code={result.improvedCode}
              height={improvedCodeHeight}
            />
          ) : null}
        </div>

        <aside ref={summaryRef} className="space-y-6 xl:self-start">
          {state.error ? <ErrorCard message={state.error} /> : null}
          {result ? <ReviewSummary result={result} /> : <EmptyState />}
        </aside>
      </div>
    </div>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-20 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {pending ? "Reviewing code..." : "Review code"}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
        <Code2 className="size-5" />
      </div>
      <h2 className="mt-4 font-semibold text-white">Waiting for review</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        After review you will see score, issues, suggestions and a cleaner code
        version.
      </p>

      <div className="mt-5 space-y-3">
        <EmptyHint text="Checks readability and structure" />
        <EmptyHint text="Finds practical bugs and risks" />
        <EmptyHint text="Returns improved code" />
      </div>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-400">
      <CheckCircle2 className="size-4 text-emerald-400" />
      {text}
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-300">
      <div className="flex items-center gap-3">
        <TriangleAlert className="size-5" />
        <p className="font-semibold">Review failed</p>
      </div>
      <p className="mt-3 text-sm leading-6">{message}</p>
    </div>
  );
}

function ReviewSummary({ result }: { result: CodeReviewResult }) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
        <div className="border-b border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Quality score</p>
              <p className="mt-1 text-4xl font-bold text-white">
                {result.score}/10
              </p>
            </div>
            <ScoreRing score={result.score} />
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-7 text-slate-300">{result.summary}</p>
        </div>
      </div>

      <ReviewList
        icon={ShieldCheck}
        title="Issues"
        items={result.issues}
        emptyText="No major issues returned."
      />
      <ReviewList
        icon={Lightbulb}
        title="Suggestions"
        items={result.suggestions}
        emptyText="No suggestions returned."
      />
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="flex size-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
      <div className="h-2 w-10 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

function ReviewList({
  emptyText,
  icon: Icon,
  items,
  title,
}: {
  emptyText: string;
  icon: typeof ShieldCheck;
  items: string[];
  title: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="size-4" />
        </div>
        <h2 className="font-semibold text-white">{title}</h2>
      </div>

      {items.length ? (
        <div className="mt-4 space-y-3">
          {items.map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-slate-950/50 text-xs font-semibold text-violet-300">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm text-slate-500">
          {emptyText}
        </p>
      )}
    </div>
  );
}

function ImprovedCodePanel({
  code,
  height,
}: {
  code: string;
  height: number | null;
}) {
  return (
    <section
      className="flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
      style={height ? { height } : undefined}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Improved code</h2>
            <p className="text-xs text-slate-500">
              Wider view for copying or downloading
            </p>
          </div>
        </div>

        <DownloadButton code={code} />
      </div>

      <pre className="min-h-0 flex-1 overflow-auto bg-slate-950/30 p-5 text-sm leading-7 text-slate-200">
        <code>{code || "No improved code returned."}</code>
      </pre>
    </section>
  );
}

function DownloadButton({ code }: { code: string }) {
  function downloadCode() {
    const blob = new Blob([code], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "mindforge-reviewed-code.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={downloadCode}
      disabled={!code}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="size-4" />
      Download
    </button>
  );
}
