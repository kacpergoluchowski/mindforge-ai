import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/layout/Logo";
import { footerGroups } from "../../data/landingPageData";
import AnimatedSection from "./AnimatedSection";
import LandingCtaLink from "./LandingCtaLink";

// Footer domyka landing page: ostatnie CTA, mapa linków i podstawowe informacje prawne.
export default function LandingFooter() {
  return (
    <footer id="about" className="bg-[#020617] px-6 pb-10 pt-8">
      <div className="mx-auto max-w-7xl">
        {/* Ostatnie CTA łapie użytkownika po przeczytaniu całej strony. */}
        <AnimatedSection className="mb-12 flex flex-col gap-6 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500 text-white">
              <Rocket aria-hidden="true" className="size-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Ready to accelerate your career?
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Join developers who are learning, building and growing with
                MindForge AI.
              </p>
            </div>
          </div>

          <LandingCtaLink href="/register">Start Learning Free</LandingCtaLink>
        </AnimatedSection>

        <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.3fr_2fr_1fr]">
          <div>
            <div className="w-[150px]">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
              The AI-powered learning platform for future software engineers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Linki w footerze są sterowane z danych, więc łatwo zmienić strukturę bez grzebania w JSX. */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold text-white">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-500">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-slate-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-white">Stay updated</h3>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Get the latest product updates and learning features inside your
              account.
            </p>
            <Link
              href="/register"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Create free account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 MindForge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
