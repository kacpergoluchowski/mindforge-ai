import Link from "next/link";

import { getActivityLogs } from "../../api/getActivityLogs";
import type { ActivityItem } from "../../types/dashboard.types";
import ActivityFeedItem from "./ActivityFeedItem";

export default async function ActivityFeed() {
  const logs = await getActivityLogs();
  const visibleItems: ActivityItem[] = logs.slice(0, 2);

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:h-70">
      <div className="mb-7 flex shrink-0 items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Activity Feed</h2>

        <Link
          href="/learn/progress"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          View all
        </Link>
      </div>

      {visibleItems.length ? (
        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto pr-2">
          {visibleItems.map((item) => (
            <ActivityFeedItem key={item.id ?? item.title} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          No activity yet.
        </div>
      )}
    </section>
  );
}
