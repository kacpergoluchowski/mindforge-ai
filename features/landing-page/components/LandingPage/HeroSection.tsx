import { Play, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  heroFloatingIcons,
  heroSocialProofAvatars,
} from "../../data/landingPageData";
import AnimatedSection from "./AnimatedSection";
import HeroHighlights from "./HeroHighlights";
import LandingCtaLink from "./LandingCtaLink";

import type { LucideIcon } from "lucide-react";

// Pierwszy ekran ma szybko wyjaśnić produkt i dać mocne CTA.
// Na mobile ukrywamy dużą grafikę, żeby strona była lżejsza i nie rozpychała layoutu.
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-12 lg:pb-20 lg:pt-24">
      {/* Dekoracyjne tło jest w CSS, więc nie generuje dodatkowego requestu na obrazek. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.26),transparent_34%),radial-gradient(circle_at_10%_10%,rgba(14,165,233,0.12),transparent_32%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <AnimatedSection>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
            <Rocket aria-hidden="true" className="size-4" />
            AI-Powered Learning Platform
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            Learn faster.
            <span className="block text-violet-400">Build smarter.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Master programming with AI mentors, personalized learning paths and
            real-world projects.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <LandingCtaLink
              href="/register"
              ariaLabel="Start learning for free"
            >
              Start Learning Free
            </LandingCtaLink>

            <Link
              href="/dashboard"
              aria-label="Open the product demo dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/5"
            >
              <Play aria-hidden="true" className="size-4" />
              Watch Demo
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <div className="flex -space-x-2">
              {/* Prosty social proof bez zewnętrznych avatarów, czyli bez dodatkowych requestów. */}
              {heroSocialProofAvatars.map((item) => (
                <span
                  key={item}
                  className="flex size-9 items-center justify-center rounded-full border-2 border-[#020617] bg-violet-500 text-xs font-bold text-white"
                >
                  {item}
                </span>
              ))}
            </div>
            <p>
              Join <span className="font-semibold text-violet-300">10,000+</span>{" "}
              developers already learning
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="relative mx-auto hidden min-h-[420px] w-full max-w-[620px] items-center justify-center lg:flex"
          delay={0.12}
        >
          <div className="absolute inset-8 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-10 h-16 w-72 rounded-[100%] border border-violet-400/30 bg-violet-500/10 blur-sm" />

          <div className="relative flex size-64 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 shadow-[0_0_80px_rgba(139,92,246,0.45)] sm:size-80">
            {/* Ikona produktu wzmacnia branding, ale nie jest preloadowana jako priority. */}
            <Image
              src="/images/icon.png"
              alt="MindForge AI"
              width={180}
              height={180}
              className="h-auto w-[180px] drop-shadow-[0_0_34px_rgba(168,85,247,0.85)]"
            />
          </div>

          {heroFloatingIcons.map(({ className, icon: Icon }) => (
            <FloatingIcon key={className} className={className} icon={Icon} />
          ))}
        </AnimatedSection>
      </div>

      <HeroHighlights />
    </section>
  );
}

type FloatingIconProps = {
  className: string;
  icon: LucideIcon;
};

function FloatingIcon({ className, icon: Icon }: FloatingIconProps) {
  return (
    // Ikony są wyłącznie dekoracyjne, dlatego ukrywamy je przed czytnikami ekranu.
    <div
      className={`absolute hidden size-16 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-300 shadow-[0_0_32px_rgba(139,92,246,0.25)] sm:flex ${className}`}
      aria-hidden="true"
    >
      <Icon className="size-7" />
    </div>
  );
}
