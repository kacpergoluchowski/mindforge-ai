import type { Metadata } from "next";

import LandingPage from "@/features/landing-page/components/LandingPage/LandingPage";
import LandingStructuredData from "@/features/landing-page/components/LandingPage/LandingStructuredData";

// Metadata tej strony odpowiada za SEO, podgląd linków i canonical landing page.
// NEXT_PUBLIC_SITE_URL powinien być ustawiony na produkcyjny adres w Vercel.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "AI Learning Platform for Developers",
  description:
    "MindForge AI helps developers learn programming with AI mentors, personalized roadmaps, practical courses, code reviews and progress tracking.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
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

// Strona główna składa się z danych strukturalnych SEO i właściwego landing page.
export default function Home() {
  return (
    <>
      <LandingStructuredData />
      <LandingPage />
    </>
  );
}
