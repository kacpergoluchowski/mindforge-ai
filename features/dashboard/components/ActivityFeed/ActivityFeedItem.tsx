import clsx from "clsx";

import type {
  ActivityColor,
  ActivityItem,
} from "../../types/dashboard.types";

type ActivityFeedItemProps = {
  item: ActivityItem;
};

const colorClasses: Record<ActivityColor, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
  blue: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
};

export default function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "flex size-10 items-center justify-center rounded-full ring-1",
            colorClasses[item.color]
          )}
        >
          <Icon className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-white">{item.title}</p>

          {item.description && (
            <p className="mt-1 text-sm text-slate-400">{item.description}</p>
          )}
        </div>
      </div>

      <span className="shrink-0 text-sm text-slate-400">{item.time}</span>
    </div>
  );
}
