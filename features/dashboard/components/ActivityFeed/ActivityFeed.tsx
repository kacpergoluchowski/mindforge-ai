import Link from "next/link";

import TranslatedText from "@/components/shared/TranslatedText";
import { getActivityLogs } from "../../api/getActivityLogs";
import type { ActivityItem } from "../../types/dashboard.types";
import ActivityFeedItem from "./ActivityFeedItem";

export default async function ActivityFeed() {
  const logs = await getActivityLogs();
  const visibleItems: ActivityItem[] = logs.slice(0, 2);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 lg:min-h-[280px] lg:p-6">
      <div className="mb-5 flex shrink-0 items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          <TranslatedText
            translationKey="dashboard.activityFeed"
            fallback="Activity Feed"
          />
        </h2>

        <Link
          href="/learn/progress"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          <TranslatedText translationKey="common.viewAll" fallback="View all" />
        </Link>
      </div>

      {visibleItems.length ? (
        <div className="min-h-0 flex-1 space-y-4 sm:space-y-5">
          {visibleItems.map((item) => (
            <ActivityFeedItem key={item.id ?? item.title} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <TranslatedText
            translationKey="dashboard.noActivity"
            fallback="No activity yet."
          />
        </div>
      )}
    </section>
  );
}
