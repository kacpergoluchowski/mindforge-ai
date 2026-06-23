import { Check } from "lucide-react";

type RoadmapStepProps = {
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};

const statusStyles = {
  completed: {
    dot: "bg-emerald-400 text-white",
    badge: "bg-emerald-500/10 text-emerald-400",
    label: "Completed",
  },
  current: {
    dot: "bg-violet-500 text-white ring-4 ring-violet-500/20",
    badge: "bg-violet-500/10 text-violet-400",
    label: "In Progress",
  },
  locked: {
    dot: "border-2 border-slate-500 bg-[#0b1220]",
    badge: "bg-slate-700/40 text-slate-400",
    label: "Locked",
  },
};

export default function RoadmapStep({
  title,
  description,
  status,
}: RoadmapStepProps) {
  const styles = statusStyles[status];

  return (
    <li className="relative flex items-center gap-5 py-2">
      <div
        className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ${styles.dot}`}
      >
        {status === "completed" && <Check className="size-4" />}
      </div>

      <div
        className={`
          flex min-w-0 flex-1 items-center justify-between gap-4 rounded-2xl px-4 py-2
          ${status === "current" ? "bg-violet-500/10" : ""}
        `}
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-white">{title}</h3>

          <p className="text-sm text-slate-400">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
        >
          {styles.label}
        </span>
      </div>
    </li>
  );
}