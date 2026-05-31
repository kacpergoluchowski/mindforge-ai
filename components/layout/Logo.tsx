import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" className="pl-4">
      <Image
        src="/images/logo.png"
        alt="MindForge AI logo"
        width={180}
        height={40}
        loading="eager"
        className="h-auto w-[160px] lg:w-[180px]"
      />
    </Link>
  );
}