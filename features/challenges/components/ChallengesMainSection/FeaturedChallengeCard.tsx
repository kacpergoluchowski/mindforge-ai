import clsx from "clsx";
import { Star, TrendingUp, Users } from "lucide-react";

import type { FeaturedChallengeCardProps } from "../../types/challenges.types";

type ChallengeColor = FeaturedChallengeCardProps["color"];
type ChallengeDifficulty = FeaturedChallengeCardProps["difficulty"];

const iconStyles: Record<ChallengeColor, string> = {
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  sky: "bg-sky-500/10 text-sky-400",
  orange: "bg-orange-500/10 text-orange-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
};

const difficultyStyles: Record<ChallengeDifficulty, string> = {
  Easy: "text-emerald-400",
  Medium: "text-orange-400",
  Hard: "text-red-400",
};

export default function FeaturedChallengeCard({
  title,
  description,
  category,
  difficulty,
  points,
  rating,
  participants,
  successRate,
  icon,
  color,
}: FeaturedChallengeCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-3 transition hover:border-violet-500/30">
      <div className="flex items-center gap-4">
        <ChallengeIcon color={color} icon={icon} />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">{title}</h3>

            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
              {category}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">{description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <ChallengeMetric
              icon={Star}
              iconClassName="fill-yellow-400 text-yellow-400"
              value={rating}
            />
            <ChallengeMetric icon={Users} value={participants} />
            <ChallengeMetric
              icon={TrendingUp}
              value={`${successRate} Success`}
            />
          </div>
        </div>

        <ChallengeAction difficulty={difficulty} points={points} />
      </div>
    </article>
  );
}

type ChallengeIconProps = {
  color: ChallengeColor;
  icon: FeaturedChallengeCardProps["icon"];
};

function ChallengeIcon({ color, icon: Icon }: ChallengeIconProps) {
  return (
    <div
      className={clsx(
        "flex size-14 shrink-0 items-center justify-center rounded-2xl",
        iconStyles[color]
      )}
    >
      <Icon className="size-6" />
    </div>
  );
}

type ChallengeMetricProps = {
  icon: FeaturedChallengeCardProps["icon"];
  iconClassName?: string;
  value: string | number;
};

function ChallengeMetric({
  icon: Icon,
  iconClassName,
  value,
}: ChallengeMetricProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon className={clsx("size-3", iconClassName)} />
      {value}
    </div>
  );
}

type ChallengeActionProps = {
  difficulty: ChallengeDifficulty;
  points: number;
};

function ChallengeAction({ difficulty, points }: ChallengeActionProps) {
  return (
    <div className="text-right">
      <p className={clsx("font-semibold", difficultyStyles[difficulty])}>
        {difficulty}
      </p>

      <p className="mt-1 text-white">{points} pts</p>

      <button
        type="button"
        className="mt-3 rounded-xl bg-violet-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
      >
        Solve
      </button>
    </div>
  );
}
