import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import TranslatedText from "@/components/shared/TranslatedText";
import { getLearningPathBySlug } from "@/features/learning-paths/api/getLearningPaths";
import LearningPathTree from "@/features/learning-paths/components/LearningPathTree/LearningPathTree";

type LearningPathDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: LearningPathDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = await getLearningPathBySlug(slug);

  return {
    title: path?.title ?? "Learning Path",
  };
}

export default async function LearningPathDetailsPage({
  params,
}: LearningPathDetailsPageProps) {
  const { slug } = await params;
  const path = await getLearningPathBySlug(slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/learn/learning-paths"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        <TranslatedText
          fallback="Back to learning paths"
          translationKey="learningPaths.backToPaths"
        />
      </Link>

      <LearningPathTree path={path} />
    </div>
  );
}
