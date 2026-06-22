import Image from "next/image";
import Link from "next/link";

export default function RegisterHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="MindForge AI"
            width={180}
            height={40}
            priority
            className="h-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-400 md:block">
            Already have an account?
          </span>

          <Link
            href="/login"
            className="
              rounded-xl
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