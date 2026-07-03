"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  Brain,
  CalendarCheck2,
  HelpCircle,
  Loader2,
  RefreshCcw,
  Sparkles,
  Target,
} from "lucide-react";

import {
  generateStudyAssistantResponse,
  type StudyAssistantMode,
  type StudyAssistantState,
} from "../../actions/studyAssistantActions";

const initialState: StudyAssistantState = {};

const resultTitles: Record<StudyAssistantMode, string> = {
  plan: "Plan nauki na dziś",
  review: "Powtórka z ostatnich lekcji",
  stuck: "Pomoc w problemie",
};

export default function StudyAssistant() {
  const [state, formAction] = useActionState(
    generateStudyAssistantResponse,
    initialState
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1424]">
        <div className="flex flex-col gap-5 border-b border-white/10 bg-white/[0.02] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
              <Sparkles className="size-4" />
              Study Assistant
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Asystent nauki
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Zaplanuj naukę, zrób szybką powtórkę albo poproś AI o pomoc, gdy
              utkniesz w konkretnym temacie.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <HeaderStat label="Tryby" value="3" />
            <HeaderStat label="Kontekst" value="AI" />
            <HeaderStat label="Cel" value="Nauka" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="space-y-4">
          <AssistantCard
            action={formAction}
            description="Dostaniesz konkretną listę rzeczy do zrobienia na dziś."
            icon={CalendarCheck2}
            mode="plan"
            submitLabel="Wygeneruj plan"
            title="Plan nauki na dziś"
          />

          <AssistantCard
            action={formAction}
            description="AI przygotuje pytania i mini zadania z ostatnich lekcji."
            icon={RefreshCcw}
            mode="review"
            submitLabel="Zrób powtórkę"
            title="Powtórka"
          />

          <form
            action={formAction}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
          >
            <input type="hidden" name="mode" value="stuck" />
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                  <HelpCircle className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Utknąłem</h2>
                  <p className="text-sm text-slate-400">
                    Opisz problem, a AI pomoże Ci go rozbić na kroki.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <textarea
                name="problem"
                placeholder="Np. Nie rozumiem różnicy między flexboxem a gridem..."
                className="min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-600 focus:border-violet-400/50"
              />
              <SubmitButton
                className="w-full"
                loadingLabel="Analizuję problem..."
                label="Pomóż mi"
              />
            </div>
          </form>
        </div>

        <section className="min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/20 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <Brain className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-white">
                  {state.mode ? resultTitles[state.mode] : "Wynik asystenta"}
                </h2>
                <p className="text-sm text-slate-500">
                  Tutaj pojawi się odpowiedź dopasowana do Twojego progresu.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {state.error ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
                {state.error}
              </div>
            ) : null}

            {state.response ? (
              <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/30 p-5 text-sm leading-7 text-slate-200">
                {state.response}
              </div>
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/20 p-8 text-center">
                <div className="flex size-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300">
                  <Target className="size-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  Wybierz, czego potrzebujesz
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Najlepiej zacząć od planu na dziś. Jeśli jesteś po lekcjach,
                  wybierz powtórkę. Jeśli coś blokuje progres, użyj sekcji
                  „Utknąłem”.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type AssistantCardProps = {
  action: (payload: FormData) => void;
  description: string;
  icon: typeof CalendarCheck2;
  mode: StudyAssistantMode;
  submitLabel: string;
  title: string;
};

function AssistantCard({
  action,
  description,
  icon: Icon,
  mode,
  submitLabel,
  title,
}: AssistantCardProps) {
  return (
    <form
      action={action}
      className="overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80"
    >
      <input type="hidden" name="mode" value={mode} />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <Icon className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold text-white">{title}</h2>
            <p className="text-sm leading-6 text-slate-400">{description}</p>
          </div>
        </div>
        <SubmitButton
          className="w-full sm:w-auto"
          label={submitLabel}
          loadingLabel="Generuję..."
        />
      </div>
    </form>
  );
}

type SubmitButtonProps = {
  className?: string;
  label: string;
  loadingLabel: string;
};

function SubmitButton({ className, label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? loadingLabel : label}
    </button>
  );
}

type HeaderStatProps = {
  label: string;
  value: string;
};

function HeaderStat({ label, value }: HeaderStatProps) {
  return (
    <div className="min-w-24 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
