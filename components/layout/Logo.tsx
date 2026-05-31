import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" className="pl-4">
      <Image
        src="/images/logo.png"
        alt="MindForge AI logo"
        width={180}
        height={3}
        loading="eager"
      />
    </Link>
  );
}
