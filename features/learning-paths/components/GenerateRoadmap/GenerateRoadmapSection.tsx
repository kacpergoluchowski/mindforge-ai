"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import GenerateRoadmap from "./GenerateRoadmap";

export default function GenerateRoadmapSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        title={
          <TranslatedText
            translationKey="learningPaths.title"
            fallback="Learning Paths"
          />
        }
        subtitle={
          <TranslatedText
            translationKey="learningPaths.subtitle"
            fallback="AI-powered roadmaps designed to help you master any skill."
          />
        }
        action={{
          label: (
            <TranslatedText
              translationKey="learningPaths.createPath"
              fallback="Create AI Path"
            />
          ),
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {isModalOpen ? (
        <GenerateRoadmap onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  );
}
