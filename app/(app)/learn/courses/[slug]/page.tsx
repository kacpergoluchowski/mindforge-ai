import { notFound } from "next/navigation";

import CourseDetails from "@/features/courses/components/CourseDetails/CourseDetails";
import { getCourseBySlug } from "@/features/courses/api/getCourses";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
}
