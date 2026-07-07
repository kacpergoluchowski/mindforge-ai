import CourseCategories from "@/features/courses/components/CourseCategories";
import ContinueLearning from "@/features/courses/components/ContinueLearning/ContinueLearning";
import GenerateCourseSection from "@/features/courses/components/GenerateCourse/GenerateCourseSection";
import PopularCourses from "@/features/courses/components/PopularCourses/PopularCourses";
import {
  getContinueLearningCourses,
  getPublishedCourses,
} from "@/features/courses/api/getCourses";
import { courseCategories } from "@/features/courses/data/coursesData";

export const metadata = {
  title: "Courses",
};

type CoursesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { category } = await searchParams;
  const activeCategory: string = courseCategories.includes(
    category as (typeof courseCategories)[number]
  )
    ? String(category)
    : "All Courses";
  const [continueLearningCourses, popularCourses] = await Promise.all([
    getContinueLearningCourses(),
    getPublishedCourses(activeCategory, { excludeStarted: true, limit: 12 }),
  ]);

  return (
    <div className="min-w-0 space-y-7 sm:space-y-8">
      <GenerateCourseSection />
      <CourseCategories activeCategory={activeCategory} />
      <ContinueLearning courses={continueLearningCourses} />
      <PopularCourses courses={popularCourses} />
    </div>
  );
}
