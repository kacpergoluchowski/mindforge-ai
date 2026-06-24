import Logo from "@/components/layout/Logo";
import Link from "next/link";

const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "Courses", href: "#courses" },
  { label: "AI Mentor", href: "#mentor" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 py-8">
        <Link href="/" className="w-[130px] sm:w-auto [&_img]:w-full">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navigationItems.map((item) => (
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
            href="/register"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white md:block"
          >
            Sign Up
          </Link>

          <Link
            href="/register"
            className="
                rounded-xl
                border border-violet-400/30
                bg-violet-500/10
                px-3 py-2.5 sm:px-5
                text-sm font-semibold text-violet-200
                transition
                hover:bg-violet-500/20
                hover:text-white
              "
          >
            <span className="sm:hidden">Start Free</span>
            <span className="hidden sm:inline">Start Learning Free</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
