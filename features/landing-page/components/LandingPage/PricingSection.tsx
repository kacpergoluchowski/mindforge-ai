import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { pricingPlans } from "../../data/landingPageData";
import LandingSectionHeader from "./LandingSectionHeader";

export default function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <LandingSectionHeader
          align="center"
          eyebrow="Simple pricing"
          title="Choose the plan that fits your goals"
          subtitle="Start for free. Upgrade anytime."
        />

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:mt-12 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-3xl border p-7 ${
                plan.highlighted
                  ? "border-violet-400 bg-violet-500/10 shadow-[0_0_45px_rgba(139,92,246,0.25)]"
                  : "border-white/10 bg-[#0d1424]"
              }`}
            >
              {plan.highlighted ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-5 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              ) : null}

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

              <div className="mt-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Free" ? (
                  <span className="text-sm text-slate-500"> / month</span>
                ) : null}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="size-4 text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`mt-9 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-violet-500 text-white hover:bg-violet-400"
                    : "border border-white/10 text-violet-200 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
