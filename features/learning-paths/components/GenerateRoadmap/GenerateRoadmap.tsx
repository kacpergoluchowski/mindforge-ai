"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import {
  generateRoadmapPreviewAction,
  saveGeneratedRoadmap,
  suggestRoadmapGoals,
} from "../../actions/roadmapGenerationActions";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type {
  GeneratedRoadmapPreview,
  RoadmapSuggestion,
  RoadmapPreviewState,
  RoadmapSuggestionState,
} from "../../types/learningPaths.types";

type RoadmapFormState = {
  goal: string;
};

type GenerateRoadmapProps = {
  onClose: () => void;
};

const initialFormState: RoadmapFormState = {
  goal: "Frontend Developer",
};
const initialSuggestionState: RoadmapSuggestionState = {};
const initialPreviewState: RoadmapPreviewState = {};

const inputStyles =
  "w-full rounded-2xl border border-white/10 bg-[#080e18] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:bg-white/[0.03]";

export default function GenerateRoadmap({ onClose }: GenerateRoadmapProps) {
  const { t } = useI18n();
  const [state, formAction] = useActionState(
    suggestRoadmapGoals,
    initialSuggestionState
  );
  const [previewState, previewFormAction] = useActionState(
    generateRoadmapPreviewAction,
    initialPreviewState
  );
  const [form, setForm] = useState<RoadmapFormState>(initialFormState);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<RoadmapSuggestion | null>(null);
  const isCurrentResult = state.normalizedGoal === form.goal.trim();
  const suggestions = isCurrentResult ? state.suggestions ?? [] : [];
  const preview =
    previewState.suggestionId === selectedSuggestion?.id
      ? previewState.preview
      : undefined;

  function updateField(field: keyof RoadmapFormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setSelectedSuggestion(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={clsx(
          "flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#101827] shadow-2xl shadow-black/50",
          preview ? "max-w-5xl" : "max-w-md"
        )}
      >
        <div className="shrink-0 flex items-start justify-between gap-3 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 sm:text-sm">
              <Sparkles className="size-4" />
              <span className="truncate">
                {t("learningPaths.generate.badge", "AI Roadmap Builder")}
              </span>
            </div>

            <h2 className="text-xl font-bold leading-tight text-white">
              {t(
                "learningPaths.generate.title",
                "Generate your learning roadmap"
              )}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t(
                "learningPaths.generate.subtitle",
                "Choose your goal. AI will use it to create a personalized roadmap."
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close", "Close")}
            className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-slate-400 transition hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <form action={formAction} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {!preview ? (
              <FormField
                icon={Target}
                label={t("learningPaths.generate.goal", "Goal")}
              >
                <input
                  name="goal"
                  value={form.goal}
                  onChange={(event) => updateField("goal", event.target.value)}
                  className={inputStyles}
                  placeholder="Frontend Developer"
                />
              </FormField>
            ) : (
              <input type="hidden" name="goal" value={form.goal} />
            )}

            {state.error && isCurrentResult && !preview ? (
              <p className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {state.error}
              </p>
            ) : null}

            {suggestions.length && !preview ? (
              <div className="mt-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  {t(
                    "learningPaths.generate.suggestionsTitle",
                    "Choose the best match"
                  )}
                </p>

                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => setSelectedSuggestion(suggestion)}
                    className={clsx(
                      "w-full rounded-2xl border p-4 text-left transition",
                      selectedSuggestion?.id === suggestion.id
                        ? "border-violet-400/70 bg-violet-500/15"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          {suggestion.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {suggestion.description}
                        </p>
                      </div>

                      {selectedSuggestion?.id === suggestion.id ? (
                        <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-400" />
                      ) : null}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                        {suggestion.level}
                      </span>
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
                        {suggestion.focus}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}

            {previewState.error ? (
              <p className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {previewState.error}
              </p>
            ) : null}

            {preview ? (
              <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
                {selectedSuggestion ? (
                  <SelectedSuggestionCard suggestion={selectedSuggestion} />
                ) : null}
                <RoadmapPreviewCard preview={preview} />
              </div>
            ) : null}
          </div>

          <div className="shrink-0 flex flex-col-reverse gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              {t("common.cancel", "Cancel")}
            </button>

            {selectedSuggestion ? (
              <>
                <input
                  type="hidden"
                  name="suggestionId"
                  value={selectedSuggestion.id}
                />
                <input
                  type="hidden"
                  name="suggestionTitle"
                  value={selectedSuggestion.title}
                />
                <input
                  type="hidden"
                  name="suggestionDescription"
                  value={selectedSuggestion.description}
                />
                <input
                  type="hidden"
                  name="suggestionLevel"
                  value={selectedSuggestion.level}
                />
                <input
                  type="hidden"
                  name="suggestionFocus"
                  value={selectedSuggestion.focus}
                />

                {preview ? (
                  <>
                    <input
                      type="hidden"
                      name="preview"
                      value={JSON.stringify(preview)}
                    />
                    <button
                      type="submit"
                      formAction={saveGeneratedRoadmap}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      <Save className="size-4" />
                      {t("learningPaths.generate.saveRoadmap", "Save roadmap")}
                    </button>
                  </>
                ) : null}

                <PreviewSubmitButton
                  formAction={previewFormAction}
                  hasPreview={Boolean(preview)}
                />
              </>
            ) : (
              <SuggestionSubmitButton />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function RoadmapPreviewCard({
  preview,
}: {
  preview: GeneratedRoadmapPreview;
}) {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-violet-300">
            {t("learningPaths.generate.previewTitle", "Roadmap preview")}
          </p>
          <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            {preview.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {preview.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            {preview.level}
          </span>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-300">
            {preview.estimatedWeeks}
          </span>
        </div>
      </div>

      {preview.milestones.length ? (
        <div className="mb-4 space-y-2">
          {preview.milestones.map((milestone) => (
            <div
              key={milestone}
              className="flex items-start gap-2 text-sm leading-6 text-slate-300"
            >
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
              {milestone}
            </div>
          ))}
        </div>
      ) : null}

      <div className="space-y-3">
        {preview.modules.map((module, index) => (
          <div
            key={`${module.title}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-sm font-semibold text-white">
              {index + 1}. {module.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {module.description}
            </p>
            {module.topics.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {module.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedSuggestionCard({
  suggestion,
}: {
  suggestion: RoadmapSuggestion;
}) {
  const { t } = useI18n();

  return (
    <aside className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
      <p className="text-sm font-semibold text-violet-300">
        {t("learningPaths.generate.selectedSuggestion", "Selected path")}
      </p>
      <h3 className="mt-2 font-bold text-white">{suggestion.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        {suggestion.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-200">
          {suggestion.level}
        </span>
        <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-slate-300">
          {suggestion.focus}
        </span>
      </div>
    </aside>
  );
}

function SuggestionSubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {pending
        ? t("learningPaths.generate.findingSuggestions", "Finding suggestions...")
        : t("learningPaths.generate.findSuggestions", "Find suggestions")}
    </button>
  );
}

function PreviewSubmitButton({
  formAction,
  hasPreview,
}: {
  formAction: (payload: FormData) => void;
  hasPreview: boolean;
}) {
  const { pending } = useFormStatus();
  const { t } = useI18n();

  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : hasPreview ? (
        <RefreshCw className="size-4" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {pending
        ? t("learningPaths.generate.generatingPreview", "Generating preview...")
        : hasPreview
          ? t("learningPaths.generate.generateAgain", "Generate again")
          : t("learningPaths.generate.generatePreview", "Generate preview")}
    </button>
  );
}

type FormFieldProps = {
  children: React.ReactNode;
  className?: string;
  icon: typeof Target;
  label: string;
};

function FormField({ children, className, icon: Icon, label }: FormFieldProps) {
  return (
    <label className={className ? `block ${className}` : "block"}>
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        <Icon className="size-4 text-violet-300" />
        {label}
      </span>
      {children}
    </label>
  );
}
