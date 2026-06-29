"use client";

import { useActionState, useLayoutEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  CheckCircle2,
  Code2,
  Download,
  FileCode2,
  FolderTree,
  Layers3,
  Lightbulb,
  Loader2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { reviewCodeAction } from "../../actions/codeReviewActions";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type {
  CodeReviewResult,
  CodeReviewMode,
  CodeReviewState,
  ProjectReviewResult,
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
  const { t } = useI18n();
  const result = state.result;
  const [mode, setMode] = useState<CodeReviewMode>("single-file");
  const activeResult = result?.mode === mode ? result : undefined;
  const singleFileResult =
    activeResult?.mode === "single-file" ? activeResult : undefined;
  const projectResult =
    activeResult?.mode === "project" ? activeResult : undefined;
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [improvedCodeHeight, setImprovedCodeHeight] = useState<number | null>(
    null
  );

  useLayoutEffect(() => {
    if (!singleFileResult) {
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
  }, [singleFileResult]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424]">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 bg-white/[0.02] p-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
              <Sparkles className="size-4" />
              {t("codeReview.badge", "AI Code Review")}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              {t("codeReview.title", "Review your code")}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              {t(
                "codeReview.subtitle",
                "Review one file or paste a project structure. MindForge checks readability, architecture and practical improvement points."
              )}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <HeaderStat
              label={t("codeReview.stats.limit", "Limit")}
              value={mode === "project" ? "30k" : "12k"}
            />
            <HeaderStat label={t("codeReview.stats.mode", "Mode")} value="AI" />
            <HeaderStat
              label={t("codeReview.stats.output", "Output")}
              value={
                mode === "project"
                  ? t("codeReview.stats.report", "Report")
                  : t("codeReview.stats.clean", "Clean")
              }
            />
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
            <input type="hidden" name="mode" value={mode} />
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  {mode === "project" ? (
                    <FolderTree className="size-5" />
                  ) : (
                    <FileCode2 className="size-5" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    {mode === "project"
                      ? t("codeReview.input.project", "Project input")
                      : t("codeReview.input.code", "Code input")}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {mode === "project"
                      ? t(
                          "codeReview.input.projectDescription",
                          "Paste structure, files or key snippets"
                        )
                      : t(
                          "codeReview.input.codeDescription",
                          "Paste one file or component"
                        )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ModeButton
                  active={mode === "single-file"}
                  label={t("codeReview.modes.singleFile", "Single File")}
                  onClick={() => setMode("single-file")}
                />
                <ModeButton
                  active={mode === "project"}
                  label={t("codeReview.modes.projectReview", "Project Review")}
                  onClick={() => setMode("project")}
                />

                {mode === "single-file" ? (
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
                ) : null}
              </div>
            </div>

            <textarea
              name="code"
              spellCheck={false}
              placeholder={
                mode === "project"
                  ? t(
                      "codeReview.input.projectPlaceholder",
                      "Paste project tree, important files or snippets here..."
                    )
                  : t("codeReview.input.codePlaceholder", "Paste your code here...")
              }
              className={clsx(
                "w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600",
                activeResult ? "min-h-[220px]" : "min-h-[560px]"
              )}
            />

            <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/20 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                {mode === "project"
                  ? t(
                      "codeReview.hints.project",
                      "Best for folder trees, architecture notes and selected files."
                    )
                  : t(
                      "codeReview.hints.singleFile",
                      "Best for single files, components and small snippets."
                    )}
              </p>
              <SubmitButton mode={mode} />
            </div>
          </form>

          {singleFileResult ? (
            <ImprovedCodePanel
              code={singleFileResult.improvedCode}
              height={improvedCodeHeight}
            />
          ) : null}
          {projectResult ? <ProjectReportPanel result={projectResult} /> : null}
        </div>

        <aside ref={summaryRef} className="space-y-6 xl:self-start">
          {state.error ? <ErrorCard message={state.error} /> : null}
          {activeResult ? (
            <ReviewSummary result={activeResult} />
          ) : (
            <EmptyState mode={mode} />
          )}
        </aside>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "h-10 rounded-xl border px-3 text-sm font-semibold transition",
        active
          ? "border-violet-400/40 bg-violet-500/20 text-white"
          : "border-white/10 bg-[#080e18] text-slate-400 hover:text-white"
      )}
    >
      {label}
    </button>
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

function SubmitButton({ mode }: { mode: CodeReviewMode }) {
  const { pending } = useFormStatus();
  const { t } = useI18n();

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
      {pending
        ? mode === "project"
          ? t("codeReview.actions.reviewingProject", "Reviewing project...")
          : t("codeReview.actions.reviewingCode", "Reviewing code...")
        : mode === "project"
          ? t("codeReview.actions.reviewProject", "Review project")
          : t("codeReview.actions.reviewCode", "Review code")}
    </button>
  );
}

function EmptyState({ mode }: { mode: CodeReviewMode }) {
  const { t } = useI18n();

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
        {mode === "project" ? (
          <FolderTree className="size-5" />
        ) : (
          <Code2 className="size-5" />
        )}
      </div>
      <h2 className="mt-4 font-semibold text-white">
        {t("codeReview.output.waiting", "Waiting for review")}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {mode === "project"
          ? t(
              "codeReview.output.projectWaitingDescription",
              "After review you will see structure, quality, risks and refactor suggestions."
            )
          : t(
              "codeReview.output.codeWaitingDescription",
              "After review you will see score, issues, suggestions and a cleaner code version."
            )}
      </p>

      <div className="mt-5 space-y-3">
        {mode === "project" ? (
          <>
            <EmptyHint text={t("codeReview.hints.checksStructure", "Checks folder structure")} />
            <EmptyHint text={t("codeReview.hints.findsRisks", "Finds architecture risks")} />
            <EmptyHint text={t("codeReview.hints.refactorPlan", "Returns refactor plan")} />
          </>
        ) : (
          <>
            <EmptyHint
              text={t(
                "codeReview.hints.checksReadability",
                "Checks readability and structure"
              )}
            />
            <EmptyHint
              text={t(
                "codeReview.hints.findsBugs",
                "Finds practical bugs and risks"
              )}
            />
            <EmptyHint
              text={t("codeReview.hints.returnsImprovedCode", "Returns improved code")}
            />
          </>
        )}
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
  const { t } = useI18n();

  return (
    <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-300">
      <div className="flex items-center gap-3">
        <TriangleAlert className="size-5" />
        <p className="font-semibold">
          {t("codeReview.errors.reviewFailed", "Review failed")}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6">{message}</p>
    </div>
  );
}

function ReviewSummary({
  result,
}: {
  result: CodeReviewResult | ProjectReviewResult;
}) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
        <div className="border-b border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">
                {t("codeReview.output.qualityScore", "Quality score")}
              </p>
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

      {result.mode === "single-file" ? (
        <>
          <ReviewList
            icon={ShieldCheck}
            title={t("codeReview.output.issues", "Issues")}
            items={result.issues}
            emptyText={t("codeReview.output.noIssues", "No major issues returned.")}
          />
          <ReviewList
            icon={Lightbulb}
            title={t("codeReview.output.suggestions", "Suggestions")}
            items={result.suggestions}
            emptyText={t("codeReview.output.noSuggestions", "No suggestions returned.")}
          />
        </>
      ) : (
        <>
          <ReviewList
            icon={ShieldCheck}
            title={t("codeReview.output.risks", "Risks")}
            items={result.risks}
            emptyText={t("codeReview.output.noRisks", "No major risks returned.")}
          />
          <ReviewList
            icon={Lightbulb}
            title={t("codeReview.output.nextSteps", "Next steps")}
            items={result.nextSteps}
            emptyText={t("codeReview.output.noNextSteps", "No next steps returned.")}
          />
        </>
      )}
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
  const { t } = useI18n();

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
            <h2 className="font-semibold text-white">
              {t("codeReview.output.improvedCode", "Improved code")}
            </h2>
            <p className="text-xs text-slate-500">
              {t(
                "codeReview.output.improvedCodeDescription",
                "Wider view for copying or downloading"
              )}
            </p>
          </div>
        </div>

        <DownloadButton code={code} />
      </div>

      <pre className="min-h-0 flex-1 overflow-auto bg-slate-950/30 p-5 text-sm leading-7 text-slate-200">
        <code>
          {code ||
            t("codeReview.output.noImprovedCode", "No improved code returned.")}
        </code>
      </pre>
    </section>
  );
}

function ProjectReportPanel({ result }: { result: ProjectReviewResult }) {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-4">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
          <Layers3 className="size-5" />
        </div>
        <div>
          <h2 className="font-semibold text-white">
            {t("codeReview.output.projectReport", "Project report")}
          </h2>
          <p className="text-xs text-slate-500">
            {t(
              "codeReview.output.projectReportDescription",
              "Structure, quality and refactor notes"
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <ReportSection
          title={t("codeReview.output.structure", "Structure")}
          items={result.structure}
        />
        <ReportSection
          title={t("codeReview.output.codeQuality", "Code quality")}
          items={result.codeQuality}
        />
        <ReportSection
          title={t("codeReview.output.suggestedRefactor", "Suggested refactor")}
          items={result.suggestedRefactor}
          className="md:col-span-2"
        />
      </div>
    </section>
  );
}

function ReportSection({
  className,
  items,
  title,
}: {
  className?: string;
  items: string[];
  title: string;
}) {
  const { t } = useI18n();

  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-slate-950/20 p-4",
        className
      )}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      {items.length ? (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          {t("codeReview.output.noNotes", "No notes returned.")}
        </p>
      )}
    </div>
  );
}

function DownloadButton({ code }: { code: string }) {
  const { t } = useI18n();

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
      {t("common.download", "Download")}
    </button>
  );
}
