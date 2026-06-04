import { Star, Users, TrendingUp } from "lucide-react";
import { Props } from "../types/challenges.types";

const iconStyles = {
  violet: "bg-violet-500/10 text-violet-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  sky: "bg-sky-500/10 text-sky-400",
  orange: "bg-orange-500/10 text-orange-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
} as const;

const difficultyStyles = {
  Easy: "text-emerald-400",
  Medium: "text-orange-400",
  Hard: "text-red-400",
} as const;

export default function FeaturedChallengeCard({
  title,
  description,
  category,
  difficulty,
  points,
  rating,
  participants,
  successRate,
  icon: Icon,
  color,
}: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-3 transition hover:border-violet-500/30">
      <div className="flex items-center gap-4">
        <div
          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${iconStyles[color]}`}
        >
          <Icon className="size-6" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">{title}</h3>

            <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
              {category}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="size-3 text-yellow-400 fill-yellow-400" />
              {rating}
            </div>

            <div className="flex items-center gap-1">
              <Users className="size-3" />
              {participants}
            </div>

            <div className="flex items-center gap-1">
              <TrendingUp className="size-3" />
              {successRate} Success
            </div>
          </div>
        </div>

        <div className="text-right">
          <p
            className={`font-semibold ${
              difficultyStyles[difficulty]
            }`}
          >
            {difficulty}
          </p>

          <p className="mt-1 text-white">{points} pts</p>

          <button className="mt-3 rounded-xl bg-violet-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-600">
            Solve
          </button>
        </div>
      </div>
    </article>
  );
}