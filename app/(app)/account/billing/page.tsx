import BillingMainSection from "@/features/billing/components/BillingMainSection/BillingMainSection";
import { getCurrentProfile } from "@/features/profile/api/getCurrentProfile";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing",
};

export default async function BillingPage() {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  return <BillingMainSection currentPlan={profile.plan} />;
}
