import { activityItems } from "../../data/dashboardData";
import ActivityFeedItem from "./ActivityFeedItem";

export default function ActivityFeed() {
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
        {activityItems.map((item) => (
          <ActivityFeedItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
