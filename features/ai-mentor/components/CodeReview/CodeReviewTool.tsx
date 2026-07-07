"use client";

import clsx from "clsx";
import {
  CheckCircle2,
  Code2,
  Copy,
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
import type { LucideIcon } from "lucide-react";
import { useActionState, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { reviewCodeAction } from "../../actions/codeReviewActions";
import type {
  CodeReviewMode,
  CodeReviewResult,
  CodeReviewState,
  ProjectReviewResult,
} from "../../types/code-review.types";
import { useI18n } from "@/lib/i18n/I18nProvider";

const languageOptions = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
];

const limits: Record<CodeReviewMode, number> = {
  "single-file": 12000,
  project: 30000,
};

const initialState: CodeReviewState = {};

export default function CodeReviewTool() {
  const [state, formAction] = useActionState(reviewCodeAction, initialState);
  const { locale, t } = useI18n();
  const [mode, setMode] = useState<CodeReviewMode>("single-file");
  const [inputValue, setInputValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [improvedCodeHeight, setImprovedCodeHeight] = useState<number | null>(
    null
  );

  const activeResult = useMemo(() => {
    return state.result?.mode === mode ? state.result : undefined;
  }, [mode, state.result]);

  const singleFileResult =
    activeResult?.mode === "single-file" ? activeResult : undefined;
  const projectResult = activeResult?.mode === "project" ? activeResult : undefined;
  const currentLimit = limits[mode];
  const isOverLimit = inputValue.length > currentLimit;

  useLayoutEffect(() => {
    if (!singleFileResult) {
      return;
    }

    const updateHeight = () => {
      const formHeight = formRef.current?.getBoundingClientRect().height ?? 0;
      const summaryHeight =
        summaryRef.current?.getBoundingClientRect().height ?? 0;

      setImprovedCodeHeight(Math.max(320, Math.round(summaryHeight - formHeight - 24)));
    };

    const frameId = window.requestAnimationFrame(updateHeight);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateHeight)
        : null;

    if (formRef.current) resizeObserver?.observe(formRef.current);
    if (summaryRef.current) resizeObserver?.observe(summaryRef.current);

    window.addEventListener("resize", updateHeight);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [singleFileResult]);

  return (
    <div className="min-w-0 space-y-6">
      <CodeReviewHero mode={mode} />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 space-y-6">
          <form
            ref={formRef}
            action={formAction}
            className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <input type="hidden" name="mode" value={mode} />
            <input type="hidden" name="locale" value={locale} />

            <div className="flex flex-col gap-4 border-b border-white/10 bg-slate-950/20 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <InputHeader mode={mode} />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <ModeButton
                  active={mode === "single-file"}
                  icon={FileCode2}
                  label={t("codeReview.modes.singleFile", "Single File")}
                  onClick={() => setMode("single-file")}
                />
                <ModeButton
                  active={mode === "project"}
                  icon={FolderTree}
                  label={t("codeReview.modes.projectReview", "Project Review")}
                  onClick={() => setMode("project")}
                />

                {mode === "single-file" ? (
                  <select
                    name="language"
                    defaultValue="javascript"
                    className="h-11 rounded-2xl border border-white/10 bg-[#080e18] px-3 text-sm text-slate-200 outline-none transition focus:border-violet-400/40"
                    aria-label={t("codeReview.input.language", "Language")}
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
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
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
                "w-full resize-y bg-transparent p-4 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600 sm:p-5",
                activeResult ? "min-h-[240px]" : "min-h-[520px]"
              )}
            />

            <div className="flex flex-col gap-4 border-t border-white/10 bg-slate-950/20 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 space-y-2">
                <p className="text-xs leading-5 text-slate-500">
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

                <CharacterCounter
                  count={inputValue.length}
                  limit={currentLimit}
                  isOverLimit={isOverLimit}
                />
              </div>

              <SubmitButton disabled={isOverLimit} mode={mode} />
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

        <aside
          ref={summaryRef}
          className="min-w-0 space-y-6 xl:sticky xl:top-24 xl:self-start"
        >
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

function CodeReviewHero({ mode }: { mode: CodeReviewMode }) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        <div className="min-w-0 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="size-3.5" />
            {t("codeReview.badge", "AI Code Review")}
          </span>

          <h1 className="mt-5 max-w-2xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("codeReview.title", "Review your code")}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {t(
              "codeReview.subtitle",
              "Review one file or paste a project structure. MindForge checks readability, architecture and practical improvement points."
            )}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <HeroPoint
            icon={ShieldCheck}
            title={t("codeReview.hero.cleanReview", "Practical review")}
          />
          <HeroPoint
            icon={Code2}
            title={
              mode === "project"
                ? t("codeReview.hero.structure", "Structure feedback")
                : t("codeReview.hero.improvedCode", "Improved code")
            }
          />
          <HeroPoint
            icon={Lightbulb}
            title={t("codeReview.hero.nextSteps", "Clear next steps")}
          />
        </div>
      </div>
    </section>
  );
}

function HeroPoint({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4 backdrop-blur">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <p className="min-w-0 text-sm font-semibold text-white">{title}</p>
    </div>
  );
}

function InputHeader({ mode }: { mode: CodeReviewMode }) {
  const { t } = useI18n();
  const Icon = mode === "project" ? FolderTree : FileCode2;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <h2 className="truncate font-semibold text-white">
          {mode === "project"
            ? t("codeReview.input.project", "Project input")
            : t("codeReview.input.code", "Code input")}
        </h2>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
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
  );
}

function ModeButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-3 text-sm font-semibold transition",
        active
          ? "border-violet-400/40 bg-violet-500/20 text-white"
          : "border-white/10 bg-[#080e18] text-slate-400 hover:border-white/20 hover:text-white"
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function CharacterCounter({
  count,
  isOverLimit,
  limit,
}: {
  count: number;
  isOverLimit: boolean;
  limit: number;
}) {
  const { t } = useI18n();
  const percentage = Math.min((count / limit) * 100, 100);

  return (
    <div className="max-w-sm">
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className={isOverLimit ? "text-red-300" : "text-slate-500"}>
          {t("codeReview.input.characters", "Characters")}
        </span>
        <span className={isOverLimit ? "text-red-300" : "text-slate-400"}>
          {count.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx(
            "h-full rounded-full transition-all",
            isOverLimit ? "bg-red-400" : "bg-violet-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function SubmitButton({
  disabled,
  mode,
}: {
  disabled: boolean;
  mode: CodeReviewMode;
}) {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
      <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
      <span>{text}</span>
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
  const percentage = Math.min(Math.max(score, 1), 10) * 10;

  return (
    <div className="flex size-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
      <div className="h-2 w-10 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-500"
          style={{ width: `${percentage}%` }}
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
  icon: LucideIcon;
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
              key={`${index}-${item}`}
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
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!code || !navigator.clipboard) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section
      className="flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
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

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyCode}
            disabled={!code}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Copy className="size-4" />
            {copied
              ? t("common.copied", "Copied")
              : t("common.copy", "Copy")}
          </button>
          <DownloadButton code={code} />
        </div>
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
          {items.map((item, index) => (
            <div
              key={`${index}-${item}`}
              className="flex gap-3 text-sm leading-6 text-slate-300"
            >
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
