import type { LucideIcon } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";

type BillingMetricCardProps = {
  icon: LucideIcon;
  labelFallback: string;
  labelKey: string;
  valueFallback: string;
  valueKey: string;
};

export default function BillingMetricCard({
  icon: Icon,
  labelFallback,
  labelKey,
  valueFallback,
  valueKey,
}: BillingMetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>
      <p className="text-sm text-slate-400">
        <TranslatedText fallback={labelFallback} translationKey={labelKey} />
      </p>
      <p className="mt-1 font-semibold text-white">
        <TranslatedText fallback={valueFallback} translationKey={valueKey} />
      </p>
    </div>
  );
}
