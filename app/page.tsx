import type { Metadata } from "next";

import LandingPage from "@/features/landing-page/components/LandingPage/LandingPage";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "AI Learning Platform for Developers",
  description:
    "MindForge AI helps developers learn programming with AI mentors, personalized roadmaps, practical courses, code reviews and progress tracking.",
  openGraph: {
    title: "MindForge AI - AI Learning Platform for Developers",
    description:
      "Learn programming with AI mentors, personalized roadmaps, courses, challenges and progress tracking.",
    images: [
      {
        url: "/images/icon.png",
        width: 512,
        height: 512,
        alt: "MindForge AI",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MindForge AI - AI Learning Platform for Developers",
    description:
      "AI-powered learning platform for programming and software engineering growth.",
    images: ["/images/icon.png"],
  },
};

export default function Home() {
  return <LandingPage />;
}
