import clsx from "clsx";

import type { TopicCardProps } from "../../types/courses.types";

type TopicColor = TopicCardProps["color"];

const colorStyles: Record<TopicColor, string> = {
  blue: "bg-sky-500/10 text-sky-400",
  green: "bg-lime-500/10 text-lime-400",
  violet: "bg-violet-500/10 text-violet-400",
  orange: "bg-orange-500/10 text-orange-400",
  sky: "bg-cyan-500/10 text-cyan-400",
  pink: "bg-pink-500/10 text-pink-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
};

export default function TopicCard({
  title,
  courses,
  icon,
  color,
}: TopicCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111a2d]/80 p-4 transition hover:border-violet-500/30 hover:bg-[#131f35]">
      <TopicIcon color={color} icon={icon} />

      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>

        <p className="mt-1 text-xs text-slate-400">{courses} courses</p>
      </div>
    </article>
  );
}

type TopicIconProps = {
  color: TopicColor;
  icon: TopicCardProps["icon"];
};

function TopicIcon({ color, icon: Icon }: TopicIconProps) {
  return (
    <div
      className={clsx(
        "flex size-12 shrink-0 items-center justify-center rounded-xl",
        colorStyles[color]
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}
