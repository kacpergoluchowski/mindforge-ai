import CoursesHero from "@/features/courses/components/CoursesHero";
import CourseCategories from "@/features/courses/components/CourseCategories";
import AILearningBanner from "@/features/courses/components/AILearningBanner";
import ContinueLearning from "@/features/courses/components/ContinueLearning";
import PopularCourses from "@/features/courses/components/PopularCourses";
import BrowseByTopic from "@/features/courses/components/BrowseByTopic";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <CoursesHero />
      <CourseCategories />
      <AILearningBanner />
      <ContinueLearning />
      <PopularCourses />
      <BrowseByTopic />
    </div>
  );
}