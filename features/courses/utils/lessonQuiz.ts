import type { CourseQuizQuestion } from "../types/courses.types";

type LessonQuizSource = {
  id: string;
  title: string;
  type: string;
  summary: string;
  objective: string | null;
  checklist: string[];
  xpReward: number;
  quizQuestions?: unknown;
};

export const passingQuizScore = 4;
export const quizQuestionCount = 5;

export function getLessonQuiz(source: LessonQuizSource): CourseQuizQuestion[] {
  const customQuestions = parseQuizQuestions(source.quizQuestions);

  if (customQuestions.length >= quizQuestionCount) {
    return customQuestions.slice(0, quizQuestionCount);
  }

  return buildFallbackQuiz(source);
}

export function getQuizScore(
  questions: CourseQuizQuestion[],
  answers: FormData
): number {
  return questions.reduce((score, question) => {
    const selectedOptionId = String(answers.get(`question_${question.id}`) ?? "");

    return selectedOptionId === question.correctOptionId ? score + 1 : score;
  }, 0);
}

function parseQuizQuestions(value: unknown): CourseQuizQuestion[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isQuizQuestion);
}

function isQuizQuestion(value: unknown): value is CourseQuizQuestion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const question = value as CourseQuizQuestion;

  return (
    typeof question.id === "string" &&
    typeof question.question === "string" &&
    typeof question.correctOptionId === "string" &&
    Array.isArray(question.options) &&
    question.options.every((option) => {
      return (
        option &&
        typeof option === "object" &&
        typeof option.id === "string" &&
        typeof option.text === "string"
      );
    })
  );
}

function buildFallbackQuiz(source: LessonQuizSource): CourseQuizQuestion[] {
  const objective =
    source.objective ?? "Understand the main concept and apply it in practice.";
  const checklistItem =
    source.checklist[0] ?? "Review the lesson content and complete the task.";
  const lessonType = formatLessonType(source.type);

  return [
    {
      id: `${source.id}_topic`,
      question: "What is the main topic of this lesson?",
      correctOptionId: "lesson",
      options: [
        { id: "lesson", text: source.title },
        { id: "dashboard", text: "Dashboard customization" },
        { id: "database", text: "Database administration" },
        { id: "deployment", text: "Production deployment" },
      ],
    },
    {
      id: `${source.id}_objective`,
      question: "What is the main goal of this lesson?",
      correctOptionId: "objective",
      options: [
        { id: "syntax", text: "Memorize random syntax without context" },
        { id: "objective", text: objective },
        { id: "skip", text: "Skip practice and move to advanced topics" },
        { id: "design", text: "Create a final visual design immediately" },
      ],
    },
    {
      id: `${source.id}_summary`,
      question: "Which statement best matches this lesson?",
      correctOptionId: "summary",
      options: [
        { id: "backend", text: "It focuses mainly on backend APIs." },
        { id: "summary", text: source.summary },
        { id: "oauth", text: "It focuses mainly on OAuth providers." },
        { id: "billing", text: "It focuses mainly on billing settings." },
      ],
    },
    {
      id: `${source.id}_checklist`,
      question: "Which task belongs to this lesson checklist?",
      correctOptionId: "checklist",
      options: [
        { id: "checklist", text: checklistItem },
        { id: "random", text: "Configure a production database backup" },
        { id: "ads", text: "Create an advertising campaign" },
        { id: "native", text: "Build a native mobile app screen" },
      ],
    },
    {
      id: `${source.id}_type`,
      question: "What kind of lesson is this?",
      correctOptionId: "type",
      options: [
        { id: "type", text: lessonType },
        { id: "exam", text: "Final exam only" },
        { id: "billing", text: "Billing setup" },
        { id: "support", text: "Support ticket" },
      ],
    },
  ];
}

function formatLessonType(type: string): string {
  const labels: Record<string, string> = {
    exercise: "Exercise",
    final_project: "Final Project",
    lesson: "Lesson",
    project: "Project",
  };

  return labels[type] ?? "Lesson";
}
