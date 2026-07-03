import Logo from "@/components/layout/Logo";
import Link from "next/link";

import { landingNavigationItems } from "../../data/landingPageData";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="w-[130px] sm:w-auto [&_img]:w-full">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {landingNavigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white md:block"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-violet-400/40 bg-violet-500 px-3 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition hover:bg-violet-400 sm:px-5"
          >
            <span className="sm:hidden">Start Free</span>
            <span className="hidden sm:inline">Start Learning Free</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
