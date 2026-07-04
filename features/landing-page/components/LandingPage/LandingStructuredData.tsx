// Dane strukturalne pomagają wyszukiwarkom zrozumieć, że MindForge AI jest aplikacją edukacyjną.
// Trzymamy je osobno, żeby SEO nie mieszało się z layoutem sekcji.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MindForge AI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "AI-powered learning platform for developers with courses, roadmaps, AI mentor, code reviews, challenges and progress tracking.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PLN",
  },
  featureList: [
    "Interactive programming courses",
    "AI mentor for developers",
    "Personalized learning paths",
    "AI code reviews",
    "Programming challenges",
    "Progress tracking with XP and achievements",
  ],
};

export default function LandingStructuredData() {
  return (
    // JSON-LD musi zostać wstrzyknięty jako surowy JSON w tagu script.
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
