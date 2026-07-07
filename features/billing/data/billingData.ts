import {
  Bot,
  Code2,
  CreditCard,
  Crown,
  Gauge,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import type {
  BillingInfoItem,
  BillingPlan,
  BillingUsageItem,
} from "../types/billing.types";

export const billingPlans = [
  {
    descriptionFallback: "Start learning and test the core platform.",
    descriptionKey: "billing.plans.free.description",
    features: [
      {
        fallback: "Course progress tracking",
        translationKey: "billing.features.courseProgress",
      },
      {
        fallback: "Basic coding challenges",
        translationKey: "billing.features.basicChallenges",
      },
      {
        fallback: "Limited AI Mentor access",
        translationKey: "billing.features.limitedAiMentor",
      },
    ],
    icon: Sparkles,
    id: "free",
    limits: [
      {
        labelFallback: "AI messages",
        labelKey: "billing.limits.aiMessages",
        valueFallback: "20 / month",
        valueKey: "billing.plans.free.aiMessages",
      },
      {
        labelFallback: "Code reviews",
        labelKey: "billing.limits.codeReviews",
        valueFallback: "3 / month",
        valueKey: "billing.plans.free.codeReviews",
      },
    ],
    nameFallback: "Free",
    nameKey: "billing.plans.free.name",
    price: "0 PLN",
  },
  {
    badgeFallback: "Popular",
    badgeKey: "billing.popular",
    descriptionFallback: "For regular learning with AI support.",
    descriptionKey: "billing.plans.pro.description",
    features: [
      {
        fallback: "More AI Mentor conversations",
        translationKey: "billing.features.moreAiMentor",
      },
      {
        fallback: "Advanced code reviews",
        translationKey: "billing.features.advancedCodeReviews",
      },
      {
        fallback: "AI-generated roadmaps",
        translationKey: "billing.features.aiRoadmaps",
      },
      {
        fallback: "Priority access to new courses",
        translationKey: "billing.features.priorityCourses",
      },
    ],
    highlighted: true,
    icon: Crown,
    id: "pro",
    limits: [
      {
        labelFallback: "AI messages",
        labelKey: "billing.limits.aiMessages",
        valueFallback: "500 / month",
        valueKey: "billing.plans.pro.aiMessages",
      },
      {
        labelFallback: "Code reviews",
        labelKey: "billing.limits.codeReviews",
        valueFallback: "50 / month",
        valueKey: "billing.plans.pro.codeReviews",
      },
    ],
    nameFallback: "Pro",
    nameKey: "billing.plans.pro.name",
    price: "39 PLN",
  },
  {
    descriptionFallback: "For heavy AI usage and portfolio building.",
    descriptionKey: "billing.plans.premium.description",
    features: [
      {
        fallback: "High AI usage limits",
        translationKey: "billing.features.highAiLimits",
      },
      {
        fallback: "Project-level code reviews",
        translationKey: "billing.features.projectReviews",
      },
      {
        fallback: "Personalized AI Mentor context",
        translationKey: "billing.features.personalizedMentor",
      },
      {
        fallback: "Early access to beta features",
        translationKey: "billing.features.futureBeta",
      },
    ],
    icon: Rocket,
    id: "premium",
    limits: [
      {
        labelFallback: "AI messages",
        labelKey: "billing.limits.aiMessages",
        valueFallback: "2,000 / month",
        valueKey: "billing.plans.premium.aiMessages",
      },
      {
        labelFallback: "Code reviews",
        labelKey: "billing.limits.codeReviews",
        valueFallback: "200 / month",
        valueKey: "billing.plans.premium.codeReviews",
      },
    ],
    nameFallback: "Premium",
    nameKey: "billing.plans.premium.name",
    price: "79 PLN",
  },
] satisfies BillingPlan[];

export const billingUsageItems = [
  {
    icon: Bot,
    labelFallback: "AI messages",
    labelKey: "billing.usage.aiMessages",
    progress: 0,
    value: "0 / 20",
  },
  {
    icon: Code2,
    labelFallback: "Code reviews",
    labelKey: "billing.usage.codeReviews",
    progress: 0,
    value: "0 / 3",
  },
  {
    icon: Gauge,
    labelFallback: "Monthly AI budget",
    labelKey: "billing.usage.monthlyBudget",
    progress: 0,
    value: "Included",
    valueKey: "billing.usage.included",
  },
] satisfies BillingUsageItem[];

export const billingInfoItems = [
  {
    descriptionFallback:
      "Add a payment method when paid plans are connected.",
    descriptionKey: "billing.info.paymentDescription",
    icon: CreditCard,
    titleFallback: "Payment method",
    titleKey: "billing.info.paymentTitle",
  },
  {
    descriptionFallback:
      "Track AI messages, code reviews and usage limits in one place.",
    descriptionKey: "billing.info.limitsDescription",
    icon: Zap,
    titleFallback: "Monthly limits",
    titleKey: "billing.info.limitsTitle",
  },
  {
    descriptionFallback:
      "Your subscription and payment data stay protected.",
    descriptionKey: "billing.info.aiDescription",
    icon: ShieldCheck,
    titleFallback: "Secure billing",
    titleKey: "billing.info.aiTitle",
  },
] satisfies BillingInfoItem[];
