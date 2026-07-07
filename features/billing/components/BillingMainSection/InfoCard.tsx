import TranslatedText from "@/components/shared/TranslatedText";
import type { BillingInfoItem } from "../../types/billing.types";

type InfoCardProps = {
  item: BillingInfoItem;
};

export default function InfoCard({ item }: InfoCardProps) {
  const Icon = item.icon;

  return (
    <article className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 transition hover:border-violet-400/25 sm:p-6">
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-white/[0.04] text-violet-300">
        <Icon className="size-5" />
      </div>
      <h2 className="font-semibold text-white">
        <TranslatedText
          fallback={item.titleFallback}
          translationKey={item.titleKey}
        />
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        <TranslatedText
          fallback={item.descriptionFallback}
          translationKey={item.descriptionKey}
        />
      </p>
    </article>
  );
}
