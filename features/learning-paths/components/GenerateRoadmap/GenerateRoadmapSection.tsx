"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Plus, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import GenerateRoadmap from "./GenerateRoadmap";

export default function GenerateRoadmapSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_44%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="min-w-0 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <BrainCircuit className="size-3.5" />
              <TranslatedText
                fallback="AI Roadmap Builder"
                translationKey="learningPaths.heroBadge"
              />
            </span>

            <h1 className="mt-5 max-w-2xl break-words text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              <TranslatedText
                translationKey="learningPaths.title"
                fallback="Learning Paths"
              />
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              <TranslatedText
                translationKey="learningPaths.subtitle"
                fallback="AI-powered roadmaps designed to help you master any skill."
              />
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
              >
                <Plus className="size-4" />
                <TranslatedText
                  translationKey="learningPaths.createPath"
                  fallback="Create AI Path"
                />
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <HeroPoint
              icon={Route}
              title={
                <TranslatedText
                  fallback="Personal roadmap"
                  translationKey="learningPaths.heroPointRoadmap"
                />
              }
            />
            <HeroPoint
              icon={BrainCircuit}
              title={
                <TranslatedText
                  fallback="AI-generated courses"
                  translationKey="learningPaths.heroPointCourses"
                />
              }
            />
            <HeroPoint
              icon={CheckCircle2}
              title={
                <TranslatedText
                  fallback="Step-by-step progress"
                  translationKey="learningPaths.heroPointProgress"
                />
              }
            />
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <GenerateRoadmap onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  );
}

type HeroPointProps = {
  icon: LucideIcon;
  title: ReactNode;
};

function HeroPoint({ icon: Icon, title }: HeroPointProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4 backdrop-blur">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <p className="min-w-0 text-sm font-semibold text-white">{title}</p>
    </div>
  );
}
