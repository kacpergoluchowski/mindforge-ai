import CourseCategories from "@/features/courses/components/CourseCategories";
import AILearningBanner from "@/features/courses/components/AILearningBanner";
import ContinueLearning from "@/features/courses/components/ContinueLearning/ContinueLearning";
import PopularCourses from "@/features/courses/components/PopularCourses/PopularCourses";
import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import { Plus } from "lucide-react";

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
      <PageHeader
        title={<TranslatedText translationKey="courses.title" fallback="Courses" />}
        subtitle={
          <TranslatedText
            translationKey="courses.subtitle"
            fallback="Explore courses designed to improve your skills"
          />
        }
        action={{
          label: (
            <TranslatedText
              translationKey="courses.createCourse"
              fallback="Create Course"
            />
          ),
          icon: Plus,
        }}
      />
      <CourseCategories activeCategory={activeCategory} />
      <AILearningBanner />
      <ContinueLearning />
      <PopularCourses category={activeCategory} />
    </div>
  );
}
