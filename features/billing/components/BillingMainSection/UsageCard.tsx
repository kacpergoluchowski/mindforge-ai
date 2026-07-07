import TranslatedText from "@/components/shared/TranslatedText";
import { billingUsageItems } from "../../data/billingData";

export default function UsageCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText fallback="Usage" translationKey="billing.usage.title" />
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          <TranslatedText
            fallback="Monthly usage preview for AI features."
            translationKey="billing.usage.description"
          />
        </p>
      </div>

      <div className="space-y-5">
        {billingUsageItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.labelKey}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Icon className="size-4 shrink-0 text-violet-300" />
                  <span className="truncate text-sm text-slate-300">
                    <TranslatedText
                      fallback={item.labelFallback}
                      translationKey={item.labelKey}
                    />
                  </span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-white">
                  {item.valueKey ? (
                    <TranslatedText
                      fallback={item.value}
                      translationKey={item.valueKey}
                    />
                  ) : (
                    item.value
                  )}
                </span>
              </div>

              <div
                aria-label={`${item.progress}%`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={item.progress}
                className="h-2 overflow-hidden rounded-full bg-slate-800"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
