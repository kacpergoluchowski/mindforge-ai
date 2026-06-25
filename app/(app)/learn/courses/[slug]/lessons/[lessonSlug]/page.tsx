import { notFound, redirect } from "next/navigation";

import { getCourseBySlug } from "@/features/courses/api/getCourses";
import CourseLessonDetails from "@/features/courses/components/CourseLessonDetails/CourseLessonDetails";

export default async function CourseLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lesson = course.modules
    .flatMap((module) => module.lessons)
    .find((courseLesson) => courseLesson.slug === lessonSlug);

  if (!lesson) {
    notFound();
  }

  if (lesson.locked) {
    redirect(`/learn/courses/${slug}`);
  }

  return <CourseLessonDetails course={course} lesson={lesson} />;
}
