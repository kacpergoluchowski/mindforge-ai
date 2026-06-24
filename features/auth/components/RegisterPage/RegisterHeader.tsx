import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function RegisterHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex w-[155px] items-center sm:w-auto [&_img]:w-full">
          <Logo />
        </Link>

        <div className="hidden items-center gap-4 sm:flex">
          <span className="hidden text-sm text-slate-400 md:block">
            Already have an account?
          </span>

          <Link
            href="/login"
            className="
              rounded-lg
              border border-white/10
              bg-white/[0.02]
              px-5 py-2.5
              text-sm font-medium text-white
              backdrop-blur-sm
              transition-all
              hover:border-violet-500/40
              hover:bg-violet-500/10
            "
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
