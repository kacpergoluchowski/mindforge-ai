import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="MindForge AI"
            width={180}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#courses"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            Courses
          </a>

          <a
            href="#mentor"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            AI Mentor
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-slate-400 transition hover:text-white"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white md:block"
          >
            Log in
          </Link>

          <Link
            href="/dashboard"
            className="
                rounded-xl
                border border-violet-400/30
                bg-violet-500/10
                px-5 py-2.5
                text-sm font-semibold text-violet-200
                transition
                hover:bg-violet-500/20
                hover:text-white
              "
          >
            Start Learning Free
          </Link>
        </div>
      </div>
    </header>
  );
}
