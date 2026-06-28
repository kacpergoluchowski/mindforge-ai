import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getChallengeBySlug } from "@/features/challenges/api/getChallenges";
import ChallengeDetails from "@/features/challenges/components/ChallengeDetails/ChallengeDetails";

type ChallengeDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ChallengeDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);

  return {
    title: challenge?.title ?? "Challenge",
  };
}

export default async function ChallengeDetailsPage({
  params,
}: ChallengeDetailsPageProps) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return <ChallengeDetails challenge={challenge} />;
}
