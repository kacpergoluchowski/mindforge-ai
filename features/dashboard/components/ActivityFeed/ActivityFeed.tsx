import { getActivityLogs } from "../../api/getActivityLogs";
import { activityItems } from "../../data/dashboardData";
import type { ActivityItem } from "../../types/dashboard.types";
import ActivityFeedItem from "./ActivityFeedItem";

export default async function ActivityFeed() {
  const logs = await getActivityLogs();
  const visibleItems: ActivityItem[] = logs.length ? logs : activityItems;

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:h-70">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Activity Feed</h2>

        <button
          type="button"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="space-y-7">
        {visibleItems.map((item) => (
          <ActivityFeedItem key={item.id ?? item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
