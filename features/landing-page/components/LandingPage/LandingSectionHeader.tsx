type LandingSectionHeaderProps = {
  align?: "left" | "center";
  eyebrow: string;
  subtitle?: string;
  title: string;
  // titleId łączy nagłówek z aria-labelledby w sekcjach.
  titleId?: string;
};

// Wspólny nagłówek sekcji utrzymuje spójne fonty, odstępy i hierarchię H2.
export default function LandingSectionHeader({
  align = "left",
  eyebrow,
  subtitle,
  title,
  titleId,
}: LandingSectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl"
      >
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
