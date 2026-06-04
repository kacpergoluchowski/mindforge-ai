import { weeklyLeaderboard } from "../data/challengesData";

const avatarStyles = {
  violet: "bg-violet-500 text-white",
  blue: "bg-blue-500 text-white",
  orange: "bg-orange-500 text-white",
  emerald: "bg-emerald-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-yellow-600 text-white",
} as const;

const topUsers = weeklyLeaderboard.slice(0, 3);
const otherUsers = weeklyLeaderboard.slice(3);

export default function WeeklyLeaderboard() {
  const first = topUsers[0];
  const second = topUsers[1];
  const third = topUsers[2];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 h-min">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Weekly Leaderboard</h2>

        <button className="text-sm text-slate-300 transition hover:text-white">
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
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-5 text-sm text-slate-400">{user.rank}</span>

              <div
                className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                  avatarStyles[user.color]
                }`}
              >
                {user.avatar}
              </div>

              <span className="text-sm font-medium text-white">{user.name}</span>
            </div>

            <span className="text-sm text-slate-400">{user.points}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

type TopUserProps = {
  user: (typeof weeklyLeaderboard)[number];
  size: "sm" | "lg";
};

function TopUser({ user, size }: TopUserProps) {
  const isFirst = user.rank === 1;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-2 flex items-center justify-center rounded-full font-semibold text-slate-900 ${
          isFirst ? "size-7 bg-yellow-400 text-sm" : "size-6 bg-slate-400 text-xs"
        }`}
      >
        {user.rank}
      </div>

      <div
        className={`flex items-center justify-center rounded-full font-semibold ${
          size === "lg" ? "size-16 text-xl" : "size-12 text-base"
        } ${avatarStyles[user.color]}`}
      >
        {user.avatar}
      </div>

      <p className="mt-3 text-sm font-medium text-white">{user.name}</p>
      <p className="mt-1 text-xs text-slate-400">{user.points}</p>
    </div>
  );
}