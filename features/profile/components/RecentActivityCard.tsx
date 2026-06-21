import { recentActivities } from "../data/profileData";

export default function RecentActivityCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <button
          type="button"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          View all
        </button>
      </div>

      <div className="space-y-1">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="
                flex items-center justify-between
                rounded-2xl
                px-2 py-3
                transition
                hover:bg-white/5
              "
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5">
                  <Icon className="size-5 text-violet-400" />
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-sm text-slate-500">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}