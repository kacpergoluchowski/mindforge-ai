import clsx from "clsx";

import { weeklyLeaderboard } from "../../data/challengesData";

type LeaderboardUser = (typeof weeklyLeaderboard)[number];
type LeaderboardAvatarColor = LeaderboardUser["color"];
type LeaderboardAvatarSize = "xs" | "sm" | "lg";

const avatarStyles: Record<LeaderboardAvatarColor, string> = {
  violet: "bg-violet-500 text-white",
  blue: "bg-blue-500 text-white",
  orange: "bg-orange-500 text-white",
  emerald: "bg-emerald-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-600 text-white",
};

const topUsers = weeklyLeaderboard.slice(0, 3);
const otherUsers = weeklyLeaderboard.slice(3);

export default function WeeklyLeaderboard() {
  const [first, second, third] = topUsers;

  return (
    <section className="h-min rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Weekly Leaderboard</h2>

        <button
          type="button"
          className="text-sm text-slate-300 transition hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="mb-7 grid grid-cols-3 items-end gap-3 text-center">
        <TopUser user={second} size="sm" />
        <TopUser user={first} size="lg" />
        <TopUser user={third} size="sm" />
      </div>

      <div className="space-y-3">
        {otherUsers.map((user) => (
          <LeaderboardRow key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

type TopUserProps = {
  user: LeaderboardUser;
  size: Extract<LeaderboardAvatarSize, "sm" | "lg">;
};

function TopUser({ user, size }: TopUserProps) {
  const isFirst = user.rank === 1;

  return (
    <div className="flex flex-col items-center">
      <RankBadge isFirst={isFirst} rank={user.rank} />
      <LeaderboardAvatar user={user} size={size} />

      <p className="mt-3 text-sm font-medium text-white">{user.name}</p>
      <p className="mt-1 text-xs text-slate-400">{user.points}</p>
    </div>
  );
}

type RankBadgeProps = {
  isFirst: boolean;
  rank: number;
};

function RankBadge({ isFirst, rank }: RankBadgeProps) {
  return (
    <div
      className={clsx(
        "mb-2 flex items-center justify-center rounded-full font-semibold text-slate-900",
        isFirst ? "size-7 bg-yellow-400 text-sm" : "size-6 bg-slate-400 text-xs"
      )}
    >
      {rank}
    </div>
  );
}

type LeaderboardAvatarProps = {
  user: LeaderboardUser;
  size: LeaderboardAvatarSize;
};

function LeaderboardAvatar({ user, size }: LeaderboardAvatarProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full font-semibold",
        avatarStyles[user.color],
        {
          "size-8 text-xs": size === "xs",
          "size-12 text-base": size === "sm",
          "size-16 text-xl": size === "lg",
        }
      )}
    >
      {user.avatar}
    </div>
  );
}

type LeaderboardRowProps = {
  user: LeaderboardUser;
};

function LeaderboardRow({ user }: LeaderboardRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-5 text-sm text-slate-400">{user.rank}</span>
        <LeaderboardAvatar user={user} size="xs" />
        <span className="text-sm font-medium text-white">{user.name}</span>
      </div>

      <span className="text-sm text-slate-400">{user.points}</span>
    </div>
  );
}
