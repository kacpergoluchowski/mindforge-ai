import SectionHeader from "@/components/shared/SectionHeader";

import { popularCourses } from "../../data/coursesData";
import PopularCourseCard from "./PopularCourseCard";

export default function PopularCourses() {
  return (
    <section className="space-y-5">
      <SectionHeader title="Popular Courses" buttonText="View All" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {popularCourses.map((course) => (
          <PopularCourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
