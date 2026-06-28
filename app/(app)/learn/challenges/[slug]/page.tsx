import { notFound } from "next/navigation";

import { getChallengeBySlug } from "@/features/challenges/api/getChallenges";
import ChallengeDetails from "@/features/challenges/components/ChallengeDetails/ChallengeDetails";

export default async function ChallengeDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return <ChallengeDetails challenge={challenge} />;
}
