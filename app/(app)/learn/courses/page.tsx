import CourseCategories from "@/features/courses/components/CourseCategories";
import AILearningBanner from "@/features/courses/components/AILearningBanner";
import ContinueLearning from "@/features/courses/components/ContinueLearning/ContinueLearning";
import GenerateCourseSection from "@/features/courses/components/GenerateCourse/GenerateCourseSection";
import PopularCourses from "@/features/courses/components/PopularCourses/PopularCourses";

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
  const activeCategory = category ?? "All Courses";

  return (
    <div className="space-y-8">
      <GenerateCourseSection />
      <CourseCategories activeCategory={activeCategory} />
      <AILearningBanner />
      <ContinueLearning />
      <PopularCourses category={activeCategory} />
    </div>
  );
}
