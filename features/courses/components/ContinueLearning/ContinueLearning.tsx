import SectionHeader from "@/components/shared/SectionHeader";
import { Atom, FileCode2, Triangle } from "lucide-react";

import { getContinueLearningCourses } from "../../api/getCourses";
import { continueLearningCourses } from "../../data/coursesData";
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

export default async function ContinueLearning() {
  const courses = await getContinueLearningCourses();
  const visibleCourses = courses.length
    ? courses.map(mapContinueLearningCard)
    : continueLearningCourses;

  return (
    <section className="space-y-5">
      <SectionHeader title="Continue Learning" buttonText="View All" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {visibleCourses.map((course) => (
          <ContinueLearningCard key={course.id} {...course} />
        ))}
      </div>
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
