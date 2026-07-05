import OpenAI from "openai";

import type { GeneratedRoadmapCourse } from "../types/learningPaths.types";

type GenerateRoadmapCourseInput = {
  pathTitle: string;
  stepTitle: string;
  stepDescription: string;
};

const COURSE_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const MIN_MODULES = 5;
const MAX_MODULES = 15;
const MIN_LESSONS_PER_MODULE = 3;
const MAX_LESSONS_PER_MODULE = 7;
const MIN_LESSON_CONTENT_LENGTH = 850;
const COURSE_OUTPUT_TOKEN_LIMIT = 32000;

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
      "Create a complete production-quality programming course for one roadmap step.",
      "The course must teach the technology seriously, like a structured junior developer curriculum, not a short tutorial or summary.",
      "The learner should be able to study the course for multiple days and actually build practical skill from it.",
      "Include fundamentals, real-world usage, common mistakes, debugging, best practices, exercises, mini projects and one final project lesson.",
      "Return only valid JSON. Do not use markdown fences.",
      "JSON schema: {\"title\": string, \"description\": string, \"category\": string, \"level\": string, \"durationMinutes\": number, \"xpReward\": number, \"modules\": [{\"title\": string, \"description\": string, \"lessons\": [{\"title\": string, \"type\": \"lesson\" | \"exercise\" | \"project\", \"summary\": string, \"content\": string, \"objective\": string, \"checklist\": string[], \"durationMinutes\": number, \"xpReward\": number, \"quizQuestions\": [{\"id\": string, \"question\": string, \"options\": [{\"id\": string, \"text\": string}], \"correctOptionId\": string, \"explanation\": string}]}]}]}",
      `Create ${MIN_MODULES} to ${MAX_MODULES} modules. Choose the amount based on the topic complexity.`,
      "Do not default to the minimum. Full technologies like TypeScript, React, Next.js, Python, SQL, Node.js or Supabase should usually have 10 to 15 modules.",
      "Smaller focused topics can have 5 to 7 modules, but only when that is genuinely enough.",
      `Each module must have ${MIN_LESSONS_PER_MODULE} to ${MAX_LESSONS_PER_MODULE} lessons.`,
      "Use a professional curriculum order: foundations first, then core concepts, real-world patterns, debugging, best practices, projects and final portfolio work.",
      "Every module should have a clear purpose and should not duplicate another module.",
      "The final module must include a realistic final project lesson.",
      "Each lesson content must be detailed and useful. Write 4 to 5 focused paragraphs before the mini task.",
      "Each paragraph should have 3 to 5 sentences and teach one concrete part of the lesson topic.",
      "Each lesson content must explain the concept, why it matters, how it works, one practical example, one common mistake and how to avoid it.",
      "Do not reuse the same wording between lessons. Every lesson must explain its own title, not the course in general.",
      "Every lesson content must include at least one code block using triple backticks. Use the language that matches the course topic, for example ```js, ```tsx, ```html, ```css, ```sql or ```python.",
      "Every lesson content must include one clearly separated practical task starting exactly with: Mini task:",
      "Mini task instructions must be concrete, for example what file to create, what function/component/query to write, what output to verify and what to change afterwards.",
      "Do not write placeholder lessons. Avoid vague phrases like 'learn the basics' without explaining the actual concept.",
      "Each lesson summary should be 1 focused sentence. Each objective should be specific and measurable.",
      "Each lesson checklist should have 5 to 7 concrete items.",
      "Set quizQuestions to an empty array for every lesson. The platform will generate quizzes separately.",
      "Set durationMinutes to a realistic full course length between 1500 and 4500 minutes.",
      "Set xpReward to a realistic full course reward between 1200 and 3500 XP.",
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
    max_output_tokens: COURSE_OUTPUT_TOKEN_LIMIT,
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
      durationMinutes: normalizeNumber(parsed.durationMinutes, 2400),
      xpReward: normalizeNumber(parsed.xpReward, 1800),
      modules: modules.length >= MIN_MODULES ? modules : getFallbackModules(title),
    };
  } catch {
    return {
      slug: createSlug(fallbackTitle),
      title: fallbackTitle,
      description: fallbackDescription || `A practical course about ${fallbackTitle}.`,
      category: "Frontend",
      level: "Beginner",
      durationMinutes: 2400,
      xpReward: 1800,
      modules: getFallbackModules(fallbackTitle),
    };
  }
}

function normalizeLesson(
  lesson: GeneratedRoadmapCourse["modules"][number]["lessons"][number] | undefined,
  lessonIndex: number
) {
  const title = normalizeText(lesson?.title) || `Lesson ${lessonIndex + 1}`;
  const checklist = normalizeStringList(lesson?.checklist).slice(0, 7);

  return {
    title,
    slug: createSlug(title),
    type: normalizeLessonType(lesson?.type),
    summary: normalizeText(lesson?.summary) || `Learn the key idea behind ${title}.`,
    content: normalizeLessonContent({
      content: lesson?.content,
      title,
      type: normalizeLessonType(lesson?.type),
    }),
    objective:
      normalizeText(lesson?.objective) ||
      `Understand ${title} and apply it in a small exercise.`,
    checklist: checklist.length
      ? checklist
      : getFallbackChecklist(title),
    durationMinutes: normalizeNumber(lesson?.durationMinutes, 60),
    xpReward: normalizeNumber(lesson?.xpReward, 55),
    quizQuestions: normalizeQuizQuestions(lesson?.quizQuestions, title),
  };
}

function normalizeLessonContent({
  content,
  title,
  type,
}: {
  content: unknown;
  title: string;
  type: "lesson" | "exercise" | "project";
}): string {
  const normalizedContent = normalizeText(content);

  if (!normalizedContent) {
    return buildDetailedFallbackContent(title, type);
  }

  const sections = [normalizedContent];

  if (normalizedContent.length < MIN_LESSON_CONTENT_LENGTH) {
    sections.push(buildLessonExpansion(title, type));
  }

  if (!normalizedContent.includes("```")) {
    sections.push(buildCodeExample(title));
  }

  if (!normalizedContent.includes("Mini task:")) {
    sections.push(buildMiniTask(title, type));
  }

  return sections.join("\n\n");
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
  return getFallbackCoursePlan(title).map((module, moduleIndex) => ({
    title: module.title,
    description: module.description,
    lessons: module.lessons.map((lesson, lessonIndex) =>
      buildFallbackLesson({
        index: moduleIndex * MIN_LESSONS_PER_MODULE + lessonIndex + 1,
        moduleTitle: module.title,
        title: lesson.title,
        type: lesson.type,
      })
    ),
  }));
}

type FallbackLessonPlan = {
  title: string;
  type?: "lesson" | "exercise" | "project";
};

type FallbackModulePlan = {
  title: string;
  description: string;
  lessons: FallbackLessonPlan[];
};

type LessonFocus = {
  fix: string;
  mistake: string;
  problem: string;
  why: string;
  workflow: string;
};

function getFallbackCoursePlan(title: string): FallbackModulePlan[] {
  const normalizedTitle = title.toLowerCase();

  if (matchesAny(normalizedTitle, ["typescript", "type script", "ts"])) {
    return [
      {
        title: "TypeScript Foundations",
        description: "Learn why TypeScript exists and how it changes everyday JavaScript work.",
        lessons: [
          { title: "What TypeScript adds to JavaScript" },
          { title: "Primitive types and type inference" },
          { title: "Working with arrays and objects" },
          { title: "Exercise: type a small user profile", type: "exercise" },
        ],
      },
      {
        title: "Functions and Data Shapes",
        description: "Use TypeScript to describe inputs, outputs and reusable object shapes.",
        lessons: [
          { title: "Typing function parameters and return values" },
          { title: "Interfaces vs type aliases" },
          { title: "Optional properties and readonly fields" },
          { title: "Exercise: type API response data", type: "exercise" },
        ],
      },
      {
        title: "Unions and Narrowing",
        description: "Model multiple states and safely narrow values before using them.",
        lessons: [
          { title: "Union types in real UI states" },
          { title: "Literal types and discriminated unions" },
          { title: "Type guards and safe checks" },
          { title: "Exercise: build a typed status renderer", type: "exercise" },
        ],
      },
      {
        title: "Generics and Reusable Utilities",
        description: "Create reusable helpers without losing type safety.",
        lessons: [
          { title: "Why generics exist" },
          { title: "Generic functions for arrays and API data" },
          { title: "Constraints and keyof basics" },
          { title: "Exercise: create a reusable select helper", type: "exercise" },
        ],
      },
      {
        title: "TypeScript in React Projects",
        description: "Apply TypeScript to components, props, events and hooks.",
        lessons: [
          { title: "Typing React component props" },
          { title: "Typing useState and derived state" },
          { title: "Typing form events" },
          { title: "Mini project: typed settings form", type: "project" },
        ],
      },
      {
        title: "Advanced Type Patterns",
        description: "Use stronger TypeScript tools for safer application code.",
        lessons: [
          { title: "Utility types in real projects" },
          { title: "Mapped types and indexed access" },
          { title: "Working with unknown safely" },
          { title: "Exercise: refactor unsafe API data", type: "exercise" },
        ],
      },
      {
        title: "Async Data and APIs",
        description: "Model asynchronous data, loading states and API responses.",
        lessons: [
          { title: "Typing fetch and async functions" },
          { title: "Modeling loading, success and error states" },
          { title: "Parsing external data safely" },
          { title: "Mini project: typed course API client", type: "project" },
        ],
      },
      {
        title: "Quality, Tooling and Debugging",
        description: "Use TypeScript with tooling habits that keep projects maintainable.",
        lessons: [
          { title: "Reading TypeScript errors effectively" },
          { title: "Using tsconfig without guessing" },
          { title: "Refactoring with compiler support" },
          { title: "Exercise: fix a broken typed module", type: "exercise" },
        ],
      },
      {
        title: "Application Architecture",
        description: "Organize typed code across features, components and shared utilities.",
        lessons: [
          { title: "Where to place shared types" },
          { title: "Separating UI types from data types" },
          { title: "Designing maintainable feature contracts" },
          { title: "Mini project: typed feature folder", type: "project" },
        ],
      },
      {
        title: "Final TypeScript Project",
        description: "Build and review a small typed feature from start to finish.",
        lessons: [
          { title: "Planning a typed feature" },
          { title: "Implementing the data model" },
          { title: "Refactoring unsafe code" },
          { title: "Final project: typed learning dashboard widget", type: "project" },
        ],
      },
    ];
  }

  return [
    {
      title: "Foundations",
      description: `Build the mental model and vocabulary needed to learn ${title} properly.`,
      lessons: [
        { title: `What ${title} is used for` },
        { title: `Core concepts of ${title}` },
        { title: `Tools and workflow for ${title}` },
        { title: `Exercise: first practical example with ${title}`, type: "exercise" },
      ],
    },
    {
      title: "Practical Building Blocks",
      description: `Turn the basics of ${title} into small repeatable skills.`,
      lessons: [
        { title: `Essential patterns in ${title}` },
        { title: `Working with real ${title} examples` },
        { title: `Debugging common ${title} issues`, type: "exercise" },
        { title: `Mini project: ${title} basics`, type: "project" },
      ],
    },
    {
      title: "Intermediate Practice",
      description: `Use ${title} in more realistic scenarios and connect multiple concepts.`,
      lessons: [
        { title: `Planning a ${title} feature` },
        { title: `Breaking ${title} work into smaller steps` },
        { title: `Improving ${title} readability and structure`, type: "exercise" },
        { title: `Mini project: structured ${title} workflow`, type: "project" },
      ],
    },
    {
      title: "Quality and Review",
      description: `Make ${title} work cleaner, easier to maintain and easier to explain.`,
      lessons: [
        { title: `Code quality in ${title}` },
        { title: `Testing your ${title} understanding`, type: "exercise" },
        { title: `Common ${title} mistakes and fixes` },
        { title: `Refactor a ${title} example`, type: "exercise" },
      ],
    },
    {
      title: "Real-World Application",
      description: `Use ${title} in scenarios that feel closer to production work.`,
      lessons: [
        { title: `Designing a realistic ${title} workflow` },
        { title: `Connecting multiple ${title} concepts` },
        { title: `Handling edge cases in ${title}`, type: "exercise" },
        { title: `Mini project: guided ${title} implementation`, type: "project" },
      ],
    },
    {
      title: "Debugging and Problem Solving",
      description: `Learn how to diagnose mistakes and improve your ${title} workflow.`,
      lessons: [
        { title: `Reading errors in ${title}` },
        { title: `Isolating a broken ${title} example`, type: "exercise" },
        { title: `Improving a weak ${title} solution` },
        { title: `Mini project: debug and polish ${title}`, type: "project" },
      ],
    },
    {
      title: "Professional Patterns",
      description: `Use ${title} with cleaner structure, naming and maintainable decisions.`,
      lessons: [
        { title: `Reusable patterns in ${title}` },
        { title: `Organizing ${title} work in a project` },
        { title: `Reviewing ${title} code like a developer`, type: "exercise" },
        { title: `Mini project: professional ${title} feature`, type: "project" },
      ],
    },
    {
      title: "Portfolio Project",
      description: `Build a complete project that proves you can use ${title} in practice.`,
      lessons: [
        { title: `Project brief and requirements for ${title}` },
        { title: `Project setup and first version` },
        { title: `Project polish and improvements`, type: "exercise" },
        { title: `Final project: practical ${title} build`, type: "project" },
      ],
    },
  ];
}

function getLessonFocus(title: string): LessonFocus {
  const normalizedTitle = title.toLowerCase();

  if (matchesAny(normalizedTitle, ["inference", "primitive"])) {
    return {
      problem: "learning when TypeScript can understand a value automatically and when you need to be explicit",
      why: "good inference keeps code readable while still catching mistakes before runtime",
      workflow: "checking the value, hovering the inferred type and only adding annotations where they clarify intent",
      mistake: "adding types everywhere even when TypeScript already knows the answer",
      fix: "let simple values infer naturally and reserve explicit annotations for boundaries like function parameters",
    };
  }

  if (matchesAny(normalizedTitle, ["function", "return", "parameter"])) {
    return {
      problem: "making function inputs and outputs predictable",
      why: "typed functions are easier to reuse and harder to call incorrectly",
      workflow: "define the input shape, decide the return value and test one valid and one invalid call",
      mistake: "typing parameters as any because it feels faster",
      fix: "describe the smallest useful type and let the compiler guide incorrect calls",
    };
  }

  if (matchesAny(normalizedTitle, ["interface", "alias", "object", "profile"])) {
    return {
      problem: "describing object shapes clearly enough that other code can rely on them",
      why: "most application data moves through objects such as users, courses, settings and API responses",
      workflow: "write the object shape first, create one valid example and then render or transform it",
      mistake: "mixing unrelated fields into one large type",
      fix: "split data into named shapes that match real concepts in the app",
    };
  }

  if (matchesAny(normalizedTitle, ["union", "status", "literal", "state"])) {
    return {
      problem: "representing a value that can be one of several known states",
      why: "UI and API logic often depends on states like loading, success, error or locked",
      workflow: "list allowed states, handle each state explicitly and avoid impossible combinations",
      mistake: "using a plain string for values that should be limited",
      fix: "use literal unions or discriminated unions so invalid states cannot compile",
    };
  }

  if (matchesAny(normalizedTitle, ["generic", "keyof", "reusable"])) {
    return {
      problem: "building reusable helpers without throwing away type information",
      why: "real projects need utility functions that work with many shapes but still remain safe",
      workflow: "start with one concrete example, identify what changes, then introduce a generic parameter",
      mistake: "using generics too early before understanding the concrete case",
      fix: "write the simple version first and only generalize after the repeated pattern is visible",
    };
  }

  if (matchesAny(normalizedTitle, ["react", "component", "props", "form"])) {
    return {
      problem: "connecting types to UI components and user input",
      why: "typed props and events prevent many common frontend bugs",
      workflow: "type the props, render one example component and check what breaks when a prop is missing",
      mistake: "typing every event or prop loosely to silence errors",
      fix: "use focused types for the component boundary and keep event handlers small",
    };
  }

  return {
    problem: "turning a concept into something you can recognize, implement and debug",
    why: "real learning happens when theory becomes a repeatable workflow",
    workflow: "build a small example, verify the output, then change one part and explain the result",
    mistake: "jumping into a large feature before the small example works",
    fix: "reduce the problem, test the smallest version and expand only after it behaves correctly",
  };
}

function buildFallbackLesson({
  index,
  moduleTitle,
  title,
  type = "lesson",
}: {
  index: number;
  moduleTitle: string;
  title: string;
  type?: "lesson" | "exercise" | "project";
}) {
  return {
    title,
    slug: createSlug(title),
    type,
    summary: `Learn and practice ${title}.`,
    content: buildDetailedFallbackContent(title, type, moduleTitle),
    objective: `Understand ${title} and use it in a practical example.`,
    checklist: getFallbackChecklist(title),
    durationMinutes: type === "project" ? 120 : 70,
    xpReward: type === "project" ? 90 : 60,
    quizQuestions: getFallbackQuiz(title, index),
  };
}

function buildDetailedFallbackContent(
  title: string,
  type: "lesson" | "exercise" | "project",
  moduleTitle = "Practical Work"
): string {
  const focus = getLessonFocus(title);

  return [
    `${title} belongs to the "${moduleTitle}" part of the course. The main idea is ${focus.problem}. This matters because ${focus.why}. When you understand this lesson, you should be able to recognize the problem in real code and choose a clean way to solve it.`,
    `The useful mental model is to treat ${title} as a tool for making one decision clearer. Before writing code, ask what information you have, what result you expect and what can go wrong if the idea is used incorrectly. This turns the topic into a practical workflow instead of a definition to memorize.`,
    `Work through this lesson by focusing on ${focus.workflow}. Do not only read the example. First predict what should happen, then run or mentally trace the code, and finally change one part of it. That process makes the lesson different from memorizing syntax because you connect the idea to behavior.`,
    `A common mistake here is ${focus.mistake}. The fix is ${focus.fix}. Keep your first implementation small, name the important values clearly, and verify the result before adding another concept on top.`,
    buildCodeExample(title),
    buildVerificationParagraph(title, moduleTitle),
    buildMiniTask(title, type),
  ].join("\n\n");
}

function buildLessonExpansion(
  title: string,
  type: "lesson" | "exercise" | "project"
): string {
  const focus = getLessonFocus(title);
  const workMode =
    type === "project"
      ? "project work"
      : type === "exercise"
        ? "focused practice"
        : "daily development";

  return [
    `In real ${workMode}, ${title} should not be treated as an isolated definition. You need to understand where it appears in a project, what decision it helps you make, and how to verify that your implementation behaves correctly.`,
    `The core reason to learn it is that ${focus.why}. If you only remember the syntax, the topic will feel useful in simple examples but confusing in a real application. If you understand the reason behind it, you can decide when to use it and when a simpler solution is enough.`,
    `A good way to study this lesson is to start with one small example, describe the expected result before running it, and then compare that expectation with the real output. This habit makes the topic practical because you learn to reason about the code instead of only recognizing the syntax.`,
    `When something does not work, reduce the example. Remove anything unrelated, keep only the part connected to ${title}, and test again. This is the same workflow you will use later in larger applications, where debugging depends on isolating one concept at a time.`,
    `Before moving on, explain the lesson in your own words and connect it to one feature you could build in a portfolio project. A good answer should mention the problem, the implementation idea and the way you would verify that the result works. If any of those parts is unclear, repeat the mini task with a smaller example.`,
  ].join("\n\n");
}

function buildVerificationParagraph(title: string, moduleTitle: string): string {
  return `After the example, verify your understanding of ${title} in three steps. First, describe how it fits into "${moduleTitle}" and what problem it solves. Second, change one important value in the code and predict the result before running it. Third, compare your prediction with the actual result and write one sentence about the difference.`;
}

function buildCodeExample(title: string): string {
  const normalizedTitle = title.toLowerCase();

  if (matchesAny(normalizedTitle, ["react", "component", "props", "state", "hook"])) {
    return [
      "```tsx",
      "type LearningCardProps = {",
      "  title: string;",
      "  completed: boolean;",
      "};",
      "",
      "export function LearningCard({ title, completed }: LearningCardProps) {",
      "  return (",
      "    <article className=\"learning-card\">",
      "      <h2>{title}</h2>",
      "      <p>{completed ? \"Completed\" : \"In progress\"}</p>",
      "    </article>",
      "  );",
      "}",
      "```",
    ].join("\n");
  }

  if (matchesAny(normalizedTitle, ["typescript", "type", "interface", "generic"])) {
    return [
      "```ts",
      "type CourseProgress = {",
      "  completedLessons: number;",
      "  totalLessons: number;",
      "};",
      "",
      "function getProgressPercent(progress: CourseProgress): number {",
      "  if (progress.totalLessons === 0) {",
      "    return 0;",
      "  }",
      "",
      "  return Math.round((progress.completedLessons / progress.totalLessons) * 100);",
      "}",
      "```",
    ].join("\n");
  }

  if (matchesAny(normalizedTitle, ["css", "layout", "grid", "flex", "responsive"])) {
    return [
      "```css",
      ".course-grid {",
      "  display: grid;",
      "  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));",
      "  gap: 1rem;",
      "}",
      "",
      ".course-card {",
      "  padding: 1rem;",
      "  border: 1px solid rgba(255, 255, 255, 0.12);",
      "  border-radius: 0.75rem;",
      "}",
      "```",
    ].join("\n");
  }

  if (matchesAny(normalizedTitle, ["html", "semantic", "form", "accessibility"])) {
    return [
      "```html",
      "<main>",
      "  <section aria-labelledby=\"lesson-title\">",
      "    <h1 id=\"lesson-title\">Learning dashboard</h1>",
      "    <p>Track your current course and continue learning.</p>",
      "    <a href=\"/learn/courses\">Browse courses</a>",
      "  </section>",
      "</main>",
      "```",
    ].join("\n");
  }

  if (matchesAny(normalizedTitle, ["sql", "database", "postgres", "supabase"])) {
    return [
      "```sql",
      "select",
      "  courses.title,",
      "  user_courses.progress_percent",
      "from user_courses",
      "join courses on courses.id = user_courses.course_id",
      "where user_courses.profile_id = auth.uid()",
      "order by user_courses.updated_at desc;",
      "```",
    ].join("\n");
  }

  return [
    "```js",
    "const lessonInput = \"practice example\";",
    "",
    "function buildLearningNote(input) {",
    "  const normalizedInput = input.trim();",
    "",
    "  return {",
    "    title: normalizedInput,",
    "    readyToReview: normalizedInput.length > 0,",
    "  };",
    "}",
    "",
    "console.log(buildLearningNote(lessonInput));",
    "```",
  ].join("\n");
}

function buildMiniTask(
  title: string,
  type: "lesson" | "exercise" | "project"
): string {
  const fileName = `${createSlug(title)}-practice`;
  const taskIntro =
    type === "project"
      ? "Build a small project slice based on this lesson."
      : type === "exercise"
        ? "Create a focused exercise based on this lesson."
        : "Create a small isolated example based on this lesson.";

  return `Mini task: ${taskIntro} Create a file named ${fileName}, implement your own version of the example above, run it, then change at least three values and write down what changed. Finish by adding one short comment explaining the most important line.`;
}

function matchesAny(value: string, keywords: string[]): boolean {
  return keywords.some((keyword) => value.includes(keyword));
}

function getFallbackChecklist(title: string): string[] {
  return [
    `Explain what problem ${title} solves`,
    "Create a minimal working example",
    "Run the example and inspect the output",
    "Change at least three inputs or settings",
    "Fix one intentional mistake",
    "Write a short note with what you learned",
    "Pass the lesson quiz",
  ];
}

function getFallbackQuiz(lessonTitle: string, seed = 1) {
  return [
    {
      id: `q${seed}_1`,
      question: `What is the main goal of "${lessonTitle}"?`,
      options: [
        { id: "a", text: `Understand and practice ${lessonTitle}` },
        { id: "b", text: "Skip the topic and continue immediately" },
        { id: "c", text: "Memorize terms without writing code" },
        { id: "d", text: "Avoid testing the result" },
      ],
      correctOptionId: "a",
      explanation: "A lesson should build understanding through practical use.",
    },
    {
      id: `q${seed}_2`,
      question: "What should you do before expanding a solution?",
      options: [
        { id: "a", text: "Build and verify a small working example" },
        { id: "b", text: "Add every possible feature at once" },
        { id: "c", text: "Ignore the output" },
        { id: "d", text: "Remove all structure from the code" },
      ],
      correctOptionId: "a",
      explanation: "Small verified examples make debugging easier.",
    },
    {
      id: `q${seed}_3`,
      question: "Why are clear names important in practice tasks?",
      options: [
        { id: "a", text: "They make the code easier to read and review" },
        { id: "b", text: "They make errors impossible" },
        { id: "c", text: "They replace the need for testing" },
        { id: "d", text: "They make the project shorter automatically" },
      ],
      correctOptionId: "a",
      explanation: "Readable names help you and other developers understand intent.",
    },
    {
      id: `q${seed}_4`,
      question: "What is a good debugging habit?",
      options: [
        { id: "a", text: "Compare expected output with actual output" },
        { id: "b", text: "Change many unrelated things at once" },
        { id: "c", text: "Ignore error messages" },
        { id: "d", text: "Delete the whole example immediately" },
      ],
      correctOptionId: "a",
      explanation: "Debugging starts with understanding the difference between expected and actual behavior.",
    },
    {
      id: `q${seed}_5`,
      question: "When is a lesson ready to be marked as understood?",
      options: [
        { id: "a", text: "When you can explain it and apply it in a small example" },
        { id: "b", text: "When you only read the title" },
        { id: "c", text: "When you skipped the mini task" },
        { id: "d", text: "When the concept still feels completely unclear" },
      ],
      correctOptionId: "a",
      explanation: "Understanding means you can explain and use the idea.",
    },
  ];
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
