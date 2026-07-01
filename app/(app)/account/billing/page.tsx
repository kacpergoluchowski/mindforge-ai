import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import BillingMainSection from "@/features/billing/components/BillingMainSection/BillingMainSection";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing",
};

export default async function BillingPage() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  return (
    <main className="space-y-8">
      <PageHeader
        title={<TranslatedText fallback="Billing" translationKey="billing.title" />}
        subtitle={
          <TranslatedText
            fallback="Manage your plan, AI limits and subscription settings."
            translationKey="billing.subtitle"
          />
        }
      />

      <BillingMainSection currentPlan={profile.plan} />
    </main>
  );
}
