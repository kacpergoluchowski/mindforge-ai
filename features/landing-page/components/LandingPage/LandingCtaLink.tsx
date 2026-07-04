import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ReactNode } from "react";

type LandingCtaLinkProps = {
  // ariaLabel przydaje się, gdy tekst CTA jest krótki albo marketingowy.
  ariaLabel?: string;
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

// Jeden komponent CTA zapobiega rozjazdom w stylach głównych przycisków landing page.
export default function LandingCtaLink({
  ariaLabel,
  children,
  href,
  variant = "primary",
}: LandingCtaLinkProps) {
  const className =
    variant === "primary"
      ? "bg-violet-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.42)] hover:bg-violet-400"
      : "border border-white/10 text-white hover:bg-white/5";

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition ${className}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}
