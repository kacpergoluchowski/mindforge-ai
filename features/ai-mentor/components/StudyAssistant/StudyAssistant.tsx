"use client";

import clsx from "clsx";
import {
  Brain,
  CalendarCheck2,
  CheckCircle2,
  Copy,
  HelpCircle,
  Lightbulb,
  Loader2,
  RefreshCcw,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  generateStudyAssistantResponse,
  type StudyAssistantMode,
  type StudyAssistantState,
} from "../../actions/studyAssistantActions";
import { useI18n } from "@/lib/i18n/I18nProvider";

const maxProblemLength = 1200;
const initialState: StudyAssistantState = {};

type AssistantModeConfig = {
  descriptionKey: string;
  descriptionFallback: string;
  icon: LucideIcon;
  mode: StudyAssistantMode;
  submitKey: string;
  submitFallback: string;
  titleKey: string;
  titleFallback: string;
};

const assistantModes: AssistantModeConfig[] = [
  {
    descriptionKey: "studyAssistant.modes.planDescription",
    descriptionFallback:
      "Get a focused plan with tasks, priority and time blocks for today.",
    icon: CalendarCheck2,
    mode: "plan",
    submitKey: "studyAssistant.actions.generatePlan",
    submitFallback: "Generate plan",
    titleKey: "studyAssistant.modes.plan",
    titleFallback: "Study plan",
  },
  {
    descriptionKey: "studyAssistant.modes.reviewDescription",
    descriptionFallback:
      "Review recent lessons with questions, answers and small practice tasks.",
    icon: RefreshCcw,
    mode: "review",
    submitKey: "studyAssistant.actions.generateReview",
    submitFallback: "Start review",
    titleKey: "studyAssistant.modes.review",
    titleFallback: "Review session",
  },
  {
    descriptionKey: "studyAssistant.modes.stuckDescription",
    descriptionFallback:
      "Describe what blocks you and get a simple step-by-step explanation.",
    icon: HelpCircle,
    mode: "stuck",
    submitKey: "studyAssistant.actions.solveProblem",
    submitFallback: "Help me",
    titleKey: "studyAssistant.modes.stuck",
    titleFallback: "I'm stuck",
  },
];

export default function StudyAssistant() {
  const [state, formAction] = useActionState(
    generateStudyAssistantResponse,
    initialState
  );
  const { locale, t } = useI18n();
  const [selectedMode, setSelectedMode] = useState<StudyAssistantMode>("plan");
  const [problem, setProblem] = useState("");
  const activeMode = useMemo(
    () => assistantModes.find((item) => item.mode === selectedMode) ?? assistantModes[0],
    [selectedMode]
  );
  const isProblemMode = selectedMode === "stuck";
  const isProblemTooLong = problem.length > maxProblemLength;

  return (
    <div className="min-w-0 space-y-6">
      <StudyAssistantHero />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-5">
            <div className="grid gap-3">
              {assistantModes.map((mode) => (
                <ModeSelectCard
                  key={mode.mode}
                  active={selectedMode === mode.mode}
                  mode={mode}
                  onClick={() => setSelectedMode(mode.mode)}
                />
              ))}
            </div>
          </section>

          <form
            action={formAction}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
          >
            <input type="hidden" name="mode" value={selectedMode} />
            <input type="hidden" name="locale" value={locale} />

            <div className="flex items-center gap-3 border-b border-white/10 bg-slate-950/20 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <activeMode.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-white">
                  {t(activeMode.titleKey, activeMode.titleFallback)}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
                  {t(activeMode.descriptionKey, activeMode.descriptionFallback)}
                </p>
              </div>
            </div>

            {isProblemMode ? (
              <div className="space-y-3 p-5">
                <textarea
                  name="problem"
                  value={problem}
                  onChange={(event) => setProblem(event.target.value)}
                  placeholder={t(
                    "studyAssistant.problemPlaceholder",
                    "Example: I do not understand the difference between Flexbox and Grid..."
                  )}
                  className="min-h-40 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-400/50"
                />
                <CharacterCounter
                  count={problem.length}
                  isOverLimit={isProblemTooLong}
                  limit={maxProblemLength}
                />
              </div>
            ) : (
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                <FormPoint
                  icon={Target}
                  title={t("studyAssistant.points.goal", "Goal")}
                  text={t(
                    "studyAssistant.points.goalText",
                    "Focused on your current progress"
                  )}
                />
                <FormPoint
                  icon={CalendarCheck2}
                  title={t("studyAssistant.points.time", "Time")}
                  text={t(
                    "studyAssistant.points.timeText",
                    "Small enough to finish today"
                  )}
                />
                <FormPoint
                  icon={CheckCircle2}
                  title={t("studyAssistant.points.action", "Action")}
                  text={t(
                    "studyAssistant.points.actionText",
                    "Clear tasks, not generic advice"
                  )}
                />
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/20 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">
                {isProblemMode
                  ? t(
                      "studyAssistant.hints.problem",
                      "Describe one concrete blocker. Short and specific works best."
                    )
                  : t(
                      "studyAssistant.hints.context",
                      "The assistant uses your learning context and recent progress."
                    )}
              </p>
              <SubmitButton
                disabled={isProblemTooLong}
                label={t(activeMode.submitKey, activeMode.submitFallback)}
                loadingLabel={t("studyAssistant.actions.generating", "Generating...")}
              />
            </div>
          </form>
        </div>

        <StudyAssistantResult state={state} />
      </div>
    </div>
  );
}

function StudyAssistantHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        <div className="min-w-0 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="size-3.5" />
            {t("studyAssistant.badge", "AI Study Assistant")}
          </span>

          <h1 className="mt-5 max-w-2xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("studyAssistant.title", "Study Assistant")}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {t(
              "studyAssistant.subtitle",
              "Plan your next session, review recent lessons or unblock a difficult topic with AI."
            )}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <HeroPoint
            icon={CalendarCheck2}
            title={t("studyAssistant.hero.plan", "Daily study plan")}
          />
          <HeroPoint
            icon={RefreshCcw}
            title={t("studyAssistant.hero.review", "Smart review")}
          />
          <HeroPoint
            icon={HelpCircle}
            title={t("studyAssistant.hero.unblock", "Unblock problems")}
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

function ModeSelectCard({
  active,
  mode,
  onClick,
}: {
  active: boolean;
  mode: AssistantModeConfig;
  onClick: () => void;
}) {
  const { t } = useI18n();
  const Icon = mode.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex min-w-0 items-center gap-3 rounded-2xl border p-4 text-left transition",
        active
          ? "border-violet-400/40 bg-violet-500/15"
          : "border-white/10 bg-slate-950/20 hover:border-white/20"
      )}
    >
      <div
        className={clsx(
          "flex size-11 shrink-0 items-center justify-center rounded-2xl",
          active
            ? "bg-violet-500/20 text-violet-200"
            : "bg-violet-500/10 text-violet-300"
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-white">
          {t(mode.titleKey, mode.titleFallback)}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">
          {t(mode.descriptionKey, mode.descriptionFallback)}
        </p>
      </div>
    </button>
  );
}

function FormPoint({
  icon: Icon,
  text,
  title,
}: {
  icon: LucideIcon;
  text: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
      <Icon className="size-5 text-violet-300" />
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
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
    <div>
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className={isOverLimit ? "text-red-300" : "text-slate-500"}>
          {t("studyAssistant.characters", "Characters")}
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
  label,
  loadingLabel,
}: {
  disabled: boolean;
  label: string;
  loadingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
      {pending ? loadingLabel : label}
    </button>
  );
}

function StudyAssistantResult({ state }: { state: StudyAssistantState }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const responseTitle = state.mode
    ? t(
        `studyAssistant.results.${state.mode}`,
        state.mode === "plan"
          ? "Study plan"
          : state.mode === "review"
            ? "Review session"
            : "Problem help"
      )
    : t("studyAssistant.results.default", "Assistant result");

  async function copyResponse() {
    if (!state.response || !navigator.clipboard) return;

    await navigator.clipboard.writeText(state.response);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/20 p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
            <Brain className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-white">{responseTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {t(
                "studyAssistant.results.description",
                "Personalized answer based on your learning context."
              )}
            </p>
          </div>
        </div>

        {state.response ? (
          <button
            type="button"
            onClick={copyResponse}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <Copy className="size-4" />
            {copied ? t("common.copied", "Copied") : t("common.copy", "Copy")}
          </button>
        ) : null}
      </div>

      <div className="p-5">
        {state.error ? <ErrorCard message={state.error} /> : null}

        {state.response ? (
          <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/30 p-5 text-sm leading-7 text-slate-200">
            {state.response}
          </div>
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
}

function ErrorCard({ message }: { message: string }) {
  const { t } = useI18n();

  return (
    <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
      <div className="flex items-center gap-3 font-semibold text-red-200">
        <TriangleAlert className="size-4" />
        {t("studyAssistant.errors.failed", "Assistant failed")}
      </div>
      <p className="mt-2 leading-6">{message}</p>
    </div>
  );
}

function EmptyResult() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/20 p-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300">
        <Lightbulb className="size-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">
        {t("studyAssistant.empty.title", "Choose what you need")}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {t(
          "studyAssistant.empty.description",
          "Start with a daily plan, review recent lessons or describe one blocker you want to understand."
        )}
      </p>
    </div>
  );
}
