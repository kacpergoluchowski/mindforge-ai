import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function LoginHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center px-5 lg:px-8">
        <Link
          href="/"
          aria-label="MindForge AI home"
          className="flex w-[155px] items-center sm:w-auto [&_img]:w-full"
        >
          <Logo />
        </Link>
      </div>
    </header>
  );
}
