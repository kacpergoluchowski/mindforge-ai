import Image from "next/image";

export default function Logo() {
  return (
      <Image
        src="/images/logo.png"
        alt="MindForge AI logo"
        width={180}
        height={40}
        loading="eager"
        className="h-auto w-[160px] lg:w-[180px]"
      />
  );
}