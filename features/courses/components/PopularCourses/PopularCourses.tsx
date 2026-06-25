import SectionHeader from "@/components/shared/SectionHeader";
import { Atom, Brain, Database, FileCode2, Server } from "lucide-react";

import { popularCourses } from "../../data/coursesData";
import { getPublishedCourses } from "../../api/getCourses";
import PopularCourseCard from "./PopularCourseCard";
import type {
  CourseListItem,
  PopularCourseCardProps,
} from "../../types/courses.types";

const iconMap = {
  atom: Atom,
  brain: Brain,
  database: Database,
  "file-code": FileCode2,
  server: Server,
};

const colorMap: Record<string, PopularCourseCardProps["color"]> = {
  blue: "blue",
  violet: "violet",
  emerald: "emerald",
  orange: "orange",
};

type PopularCoursesProps = {
  category: string;
};

export default async function PopularCourses({ category }: PopularCoursesProps) {
  const courses = await getPublishedCourses(category, { excludeStarted: true });
  const visibleCourses =
    courses.length || category !== "All Courses"
      ? courses.map(mapCourseCard)
      : popularCourses;

  return (
    <section className="space-y-5">
      <SectionHeader title="Popular Courses" buttonText="View All" />

      {visibleCourses.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleCourses.map((course) => (
            <PopularCourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 text-sm text-slate-400">
          No courses in this category yet.
        </div>
      )}
    </section>
  );
}

function mapCourseCard(course: CourseListItem): PopularCourseCardProps {
  return {
    id: course.id,
    slug: course.slug,
    firstLessonSlug: course.firstLessonSlug ?? undefined,
    nextLessonSlug: course.nextLessonSlug ?? undefined,
    title: course.title,
    description: course.description,
    rating: course.rating,
    students: course.students,
    lessons: course.lessons,
    level: course.level,
    icon: iconMap[course.icon as keyof typeof iconMap] ?? FileCode2,
    color: colorMap[course.color] ?? "blue",
    status: course.status ?? undefined,
    progress: course.progress,
  };
}
