import CourseCategories from "@/features/courses/components/CourseCategories";
import AILearningBanner from "@/features/courses/components/AILearningBanner";
import ContinueLearning from "@/features/courses/components/ContinueLearning/ContinueLearning";
import PopularCourses from "@/features/courses/components/PopularCourses/PopularCourses";
import BrowseByTopic from "@/features/courses/components/BrowseByTopic/BrowseByTopic";
import PageHeader from "@/components/shared/PageHeader";
import { Plus } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Courses"
        subtitle="Explore courses designed to improve your skills"
        action={{
          label: "Create Course",
          icon: Plus,
        }}
      />
      <CourseCategories />
      <AILearningBanner />
      <ContinueLearning />
      <PopularCourses />
      <BrowseByTopic />
    </div>
  );
}
