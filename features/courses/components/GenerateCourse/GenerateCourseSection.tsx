"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import GenerateCourseModal from "./GenerateCourseModal";

export default function GenerateCourseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
          onClick: () => setIsModalOpen(true),
        }}
      />

      {isModalOpen ? (
        <GenerateCourseModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  );
}
