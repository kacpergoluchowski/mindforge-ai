type LandingSectionHeaderProps = {
  align?: "left" | "center";
  eyebrow: string;
  subtitle?: string;
  title: string;
};

export default function LandingSectionHeader({
  align = "left",
  eyebrow,
  subtitle,
  title,
}: LandingSectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
