const navigationLabelKeys: Record<string, string> = {
  "/dashboard": "navigation.dashboard",
  "/learn/learning-paths": "navigation.learningPaths",
  "/learn/courses": "navigation.courses",
  "/learn/challenges": "navigation.challenges",
  "/learn/progress": "navigation.progress",
  "/ai-mentor/chat": "navigation.chatWithAi",
  "/ai-mentor/study-assistant": "navigation.studyAssistant",
  "/ai-mentor/code-review": "navigation.codeReview",
  "/account/profile": "navigation.profile",
  "/account/billing": "navigation.billing",
};

const navigationSectionKeys: Record<string, string> = {
  Learn: "navigation.learn",
  "AI Mentor": "navigation.aiMentor",
  Account: "navigation.account",
};

export function getNavigationLabelKey(href: string) {
  return navigationLabelKeys[href];
}

export function getNavigationSectionKey(title: string) {
  return navigationSectionKeys[title];
}
