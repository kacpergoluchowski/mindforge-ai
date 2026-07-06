import SectionHeader from "@/components/shared/SectionHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import { Atom, FileCode2, Triangle } from "lucide-react";

import ContinueLearningCard from "./ContinueLearningCard";
import type {
  ContinueLearningCardProps,
  ContinueLearningCourse,
} from "../../types/courses.types";

const iconMap = {
  atom: Atom,
  "file-code": FileCode2,
  triangle: Triangle,
};

const colorMap: Record<string, ContinueLearningCardProps["color"]> = {
  blue: "blue",
  green: "green",
  violet: "violet",
};

const VISIBLE_COURSES = 4;

type ContinueLearningProps = {
  courses: ContinueLearningCourse[];
};

export default function ContinueLearning({ courses }: ContinueLearningProps) {
  const visibleCourses = courses
    .slice(0, VISIBLE_COURSES)
    .map(mapContinueLearningCard);

  return (
    <section className="space-y-5">
      <SectionHeader
        title={
          <TranslatedText
            translationKey="courses.continueLearning"
            fallback="Continue Learning"
          />
        }
        buttonText={
          <TranslatedText translationKey="common.viewAll" fallback="View All" />
        }
      />

      {visibleCourses.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {visibleCourses.map((course) => (
            <ContinueLearningCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-5 text-sm text-slate-400 sm:p-6">
          <TranslatedText
            translationKey="dashboard.noCoursesInProgress"
            fallback="No courses in progress."
          />
        </div>
      )}
    </section>
  );
}

function mapContinueLearningCard(
  course: ContinueLearningCourse
): ContinueLearningCardProps {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    instructor: "MindForge AI",
    progress: course.progress,
    duration: course.duration,
    level: course.level,
    status: course.status,
    icon: iconMap[course.icon as keyof typeof iconMap] ?? FileCode2,
    color: colorMap[course.color] ?? "blue",
  };
}
