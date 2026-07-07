import type { BillingPlanId } from "../types/billing.types";

export function normalizePlan(plan: string): BillingPlanId {
  const normalizedPlan = plan.toLowerCase();

  if (normalizedPlan === "pro") return "pro";
  if (normalizedPlan === "premium") return "premium";

  return "free";
}
