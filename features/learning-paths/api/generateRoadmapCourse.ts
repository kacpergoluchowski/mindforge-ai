import OpenAI from "openai";

import type { GeneratedRoadmapCourse } from "../types/learningPaths.types";

type GenerateRoadmapCourseInput = {
  pathTitle: string;
  stepTitle: string;
  stepDescription: string;
};

const COURSE_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const MIN_MODULES = 5;
const MAX_MODULES = 7;
const MIN_LESSONS_PER_MODULE = 4;
const MAX_LESSONS_PER_MODULE = 6;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoadmapCourse({
  pathTitle,
  stepTitle,
  stepDescription,
}: GenerateRoadmapCourseInput): Promise<GeneratedRoadmapCourse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  const response = await openai.responses.create({
    model: COURSE_MODEL,
    instructions: [
      "You are MindForge AI, an educational course designer for programming learners.",
      "Create a full production-quality course for one roadmap step.",
      "The course must feel like a real MindForge AI course, not a short tutorial.",
      "The course should include theory, practice, exercises, mini projects and one final project lesson.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"title\": string, \"description\": string, \"category\": string, \"level\": string, \"durationMinutes\": number, \"xpReward\": number, \"modules\": [{\"title\": string, \"description\": string, \"lessons\": [{\"title\": string, \"type\": \"lesson\" | \"exercise\" | \"project\", \"summary\": string, \"content\": string, \"objective\": string, \"checklist\": string[], \"durationMinutes\": number, \"xpReward\": number, \"quizQuestions\": [{\"id\": string, \"question\": string, \"options\": [{\"id\": string, \"text\": string}], \"correctOptionId\": string, \"explanation\": string}]}]}]}",
      `Create ${MIN_MODULES} to ${MAX_MODULES} modules.`,
      `Each module must have ${MIN_LESSONS_PER_MODULE} to ${MAX_LESSONS_PER_MODULE} lessons.`,
      "The final module must include a project lesson.",
      "Each lesson content should include a clear explanation, practical example idea and a mini task.",
      "Each lesson checklist should have 4 to 6 concrete items.",
      "For quizQuestions, return an empty array if the full quiz would make the JSON too long. The platform can generate fallback quiz questions.",
      "Set durationMinutes to a realistic full course length between 900 and 1800 minutes.",
      "Set xpReward to a realistic full course reward between 600 and 1200 XP.",
      "Use English content for now.",
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          `Roadmap: ${pathTitle}`,
          `Step: ${stepTitle}`,
          `Step description: ${stepDescription}`,
        ].join("\n"),
      },
    ],
    max_output_tokens: 14000,
  });

  return normalizeGeneratedCourse(response.output_text, stepTitle, stepDescription);
}

function normalizeGeneratedCourse(
  value: string,
  fallbackTitle: string,
  fallbackDescription: string
): GeneratedRoadmapCourse {
  try {
    const parsed = JSON.parse(value.trim()) as Partial<GeneratedRoadmapCourse>;
    const title = normalizeText(parsed.title) || fallbackTitle;
    const modules = Array.isArray(parsed.modules)
      ? parsed.modules
          .map((module, moduleIndex) => ({
            title: normalizeText(module?.title) || `Module ${moduleIndex + 1}`,
            description:
              normalizeText(module?.description) ||
              "Learn and practice the main ideas from this part of the course.",
            lessons: Array.isArray(module?.lessons)
              ? module.lessons
                  .map((lesson, lessonIndex) =>
                    normalizeLesson(lesson, lessonIndex)
                  )
                  .filter((lesson) => lesson.title && lesson.content)
                  .slice(0, MAX_LESSONS_PER_MODULE)
              : [],
          }))
          .filter((module) => module.lessons.length)
          .slice(0, MAX_MODULES)
      : [];

    return {
      slug: createSlug(title),
      title,
      description:
        normalizeText(parsed.description) ||
        fallbackDescription ||
        `A practical course about ${title}.`,
      category: normalizeCategory(parsed.category),
      level: normalizeText(parsed.level) || "Beginner",
      durationMinutes: normalizeNumber(parsed.durationMinutes, 1200),
      xpReward: normalizeNumber(parsed.xpReward, 900),
      modules: modules.length >= MIN_MODULES ? modules : getFallbackModules(title),
    };
  } catch {
    return {
      slug: createSlug(fallbackTitle),
      title: fallbackTitle,
      description: fallbackDescription || `A practical course about ${fallbackTitle}.`,
      category: "Frontend",
      level: "Beginner",
      durationMinutes: 1200,
      xpReward: 900,
      modules: getFallbackModules(fallbackTitle),
    };
  }
}

function normalizeLesson(
  lesson: GeneratedRoadmapCourse["modules"][number]["lessons"][number] | undefined,
  lessonIndex: number
) {
  const title = normalizeText(lesson?.title) || `Lesson ${lessonIndex + 1}`;
  const checklist = normalizeStringList(lesson?.checklist).slice(0, 5);

  return {
    title,
    slug: createSlug(title),
    type: normalizeLessonType(lesson?.type),
    summary: normalizeText(lesson?.summary) || `Learn the key idea behind ${title}.`,
    content:
      normalizeText(lesson?.content) ||
      `This lesson explains ${title} with practical examples and a small task.`,
    objective:
      normalizeText(lesson?.objective) ||
      `Understand ${title} and apply it in a small exercise.`,
    checklist: checklist.length
      ? checklist
      : ["Read the lesson", "Complete the mini task", "Review the quiz"],
    durationMinutes: normalizeNumber(lesson?.durationMinutes, 45),
    xpReward: normalizeNumber(lesson?.xpReward, 40),
    quizQuestions: normalizeQuizQuestions(lesson?.quizQuestions, title),
  };
}

function normalizeQuizQuestions(
  questions: unknown,
  lessonTitle: string
): GeneratedRoadmapCourse["modules"][number]["lessons"][number]["quizQuestions"] {
  if (!Array.isArray(questions)) {
    return getFallbackQuiz(lessonTitle);
  }

  const normalized = questions
    .map((question, index) => {
      if (!question || typeof question !== "object") {
        return null;
      }

      const item = question as {
        id?: unknown;
        question?: unknown;
        options?: unknown;
        correctOptionId?: unknown;
        explanation?: unknown;
      };
      const options = Array.isArray(item.options)
        ? item.options
            .map((option, optionIndex) => {
              if (!option || typeof option !== "object") {
                return null;
              }

              const optionItem = option as { id?: unknown; text?: unknown };

              return {
                id: normalizeText(optionItem.id) || ["a", "b", "c", "d"][optionIndex],
                text: normalizeText(optionItem.text),
              };
            })
            .filter((option): option is { id: string; text: string } =>
              Boolean(option?.id && option.text)
            )
            .slice(0, 4)
        : [];

      if (!normalizeText(item.question) || options.length !== 4) {
        return null;
      }

      return {
        id: normalizeText(item.id) || `q${index + 1}`,
        question: normalizeText(item.question),
        options,
        correctOptionId: normalizeText(item.correctOptionId) || options[0].id,
        explanation: normalizeText(item.explanation),
      };
    })
    .filter((question): question is NonNullable<typeof question> =>
      Boolean(question)
    )
    .slice(0, 5);

  return normalized.length === 5 ? normalized : getFallbackQuiz(lessonTitle);
}

function getFallbackModules(
  title: string
): GeneratedRoadmapCourse["modules"] {
  return [
    {
      title: "Foundations",
      description: `Build the mental model and vocabulary needed to learn ${title} properly.`,
      lessons: [
        buildFallbackLesson(`Introduction to ${title}`, 1),
        buildFallbackLesson(`Core concepts of ${title}`, 2),
        buildFallbackLesson(`Tools and workflow for ${title}`, 3),
        buildFallbackLesson(`First practical example with ${title}`, 4, "exercise"),
      ],
    },
    {
      title: "Practical Building Blocks",
      description: `Turn the basics of ${title} into small repeatable skills.`,
      lessons: [
        buildFallbackLesson(`Essential patterns in ${title}`, 5),
        buildFallbackLesson(`Working with real examples`, 6),
        buildFallbackLesson(`Debugging common issues`, 7, "exercise"),
        buildFallbackLesson(`Mini project: ${title} basics`, 8, "project"),
      ],
    },
    {
      title: "Intermediate Practice",
      description: `Use ${title} in more realistic scenarios and connect multiple concepts.`,
      lessons: [
        buildFallbackLesson(`Planning a ${title} feature`, 9),
        buildFallbackLesson(`Breaking work into smaller steps`, 10),
        buildFallbackLesson(`Improving readability and structure`, 11, "exercise"),
        buildFallbackLesson(`Mini project: structured ${title} workflow`, 12, "project"),
      ],
    },
    {
      title: "Quality and Review",
      description: `Learn how to make ${title} work cleaner, easier to maintain and easier to explain.`,
      lessons: [
        buildFallbackLesson(`Code quality in ${title}`, 13),
        buildFallbackLesson(`Testing your understanding`, 14, "exercise"),
        buildFallbackLesson(`Common mistakes and fixes`, 15),
        buildFallbackLesson(`Refactor a ${title} example`, 16, "exercise"),
      ],
    },
    {
      title: "Portfolio Project",
      description: `Build a complete project that proves you can use ${title} in practice.`,
      lessons: [
        buildFallbackLesson(`Project brief and requirements`, 17),
        buildFallbackLesson(`Project setup and first version`, 18, "exercise"),
        buildFallbackLesson(`Project polish and improvements`, 19, "exercise"),
        buildFallbackLesson(`Final project: ${title}`, 20, "project"),
      ],
    },
  ];
}

function buildFallbackLesson(
  title: string,
  index: number,
  type: "lesson" | "exercise" | "project" = "lesson"
) {
  return {
    title,
    slug: createSlug(title),
    type,
    summary: `Learn and practice ${title}.`,
    content: [
      `This lesson focuses on ${title}. Start by understanding the concept in plain language, then connect it to a practical programming workflow.`,
      `After the explanation, create a small example on your own. Do not copy blindly. Try to explain what each part does and why it belongs there.`,
      `Mini task: build a small example related to ${title}, then write two notes: what worked well and what you still need to practice.`,
    ].join("\n\n"),
    objective: `Understand ${title} and use it in a practical example.`,
    checklist: [
      "Read the full lesson",
      "Write a small example",
      "Complete the mini task",
      "Review your mistakes",
      "Pass the quiz",
    ],
    durationMinutes: 45,
    xpReward: 40,
    quizQuestions: getFallbackQuiz(title, index),
  };
}

function getFallbackQuiz(lessonTitle: string, seed = 1) {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `q${seed}_${index + 1}`,
    question: `What is the main goal of "${lessonTitle}"?`,
    options: [
      { id: "a", text: `Understand and practice ${lessonTitle}` },
      { id: "b", text: "Skip the topic completely" },
      { id: "c", text: "Focus only on visual decoration" },
      { id: "d", text: "Ignore the lesson objective" },
    ],
    correctOptionId: "a",
    explanation: "The lesson is meant to build understanding through practice.",
  }));
}

function normalizeLessonType(value: unknown): "lesson" | "exercise" | "project" {
  if (value === "exercise" || value === "project") {
    return value;
  }

  return "lesson";
}

function normalizeCategory(value: unknown): string {
  const category = normalizeText(value);

  return category || "Frontend";
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeNumber(value: unknown, fallback: number): number {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue > 0
    ? Math.round(numberValue)
    : fallback;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function createSlug(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "generated-course"
  );
}
