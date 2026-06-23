import { activityItems } from "../../data/dashboardData";
import ActivityFeedItem from "./ActivityFeedItem";

export default function ActivityFeed() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 semiXl:w-2/5 mt-5 semiXl:mt-0 sm:h-70">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Activity Feed</h2>

        <button className="text-sm text-slate-400 transition hover:text-white">
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
