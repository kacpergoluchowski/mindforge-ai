import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CourseDetails from "@/features/courses/components/CourseDetails/CourseDetails";
import { getCourseBySlug } from "@/features/courses/api/getCourses";

type CourseDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  return {
    title: course?.title ?? "Course",
  };
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
}
