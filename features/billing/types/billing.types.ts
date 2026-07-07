import type { LucideIcon } from "lucide-react";

export type BillingPlanId = "free" | "pro" | "premium";

export type BillingPlanFeature = {
  fallback: string;
  translationKey: string;
};

export type BillingPlanLimit = {
  labelFallback: string;
  labelKey: string;
  valueFallback: string;
  valueKey: string;
};

export type BillingPlan = {
  badgeFallback?: string;
  badgeKey?: string;
  descriptionFallback: string;
  descriptionKey: string;
  features: BillingPlanFeature[];
  highlighted?: boolean;
  icon: LucideIcon;
  id: BillingPlanId;
  limits: BillingPlanLimit[];
  nameFallback: string;
  nameKey: string;
  price: string;
};

export type BillingUsageItem = {
  icon: LucideIcon;
  labelFallback: string;
  labelKey: string;
  progress: number;
  value: string;
  valueKey?: string;
};

export type BillingInfoItem = {
  descriptionFallback: string;
  descriptionKey: string;
  icon: LucideIcon;
  titleFallback: string;
  titleKey: string;
};
