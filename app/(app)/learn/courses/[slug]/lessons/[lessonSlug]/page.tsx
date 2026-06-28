import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCourseBySlug } from "@/features/courses/api/getCourses";
import CourseLessonDetails from "@/features/courses/components/CourseLessonDetails/CourseLessonDetails";

type CourseLessonPageProps = {
  params: Promise<{ slug: string; lessonSlug: string }>;
};

export async function generateMetadata({
  params,
}: CourseLessonPageProps): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = await getCourseBySlug(slug);
  const lesson = course?.modules
    .flatMap((module) => module.lessons)
    .find((courseLesson) => courseLesson.slug === lessonSlug);

  return {
    title: lesson ? `${lesson.title}` : "Lesson",
  };
}

export default async function CourseLessonPage({
  params,
}: CourseLessonPageProps) {
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
