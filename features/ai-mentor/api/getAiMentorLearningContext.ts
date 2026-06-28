import { createClient } from "@/lib/supabase/server";

type ProfileSkillRelation = {
  skills: SkillRelation | SkillRelation[] | null;
};

type SkillRelation = {
  name: string;
};

type ProfileRow = {
  full_name: string | null;
  username: string | null;
  role: string | null;
  level: number | null;
  xp: number | null;
  xp_goal: number | null;
  streak_days: number | null;
  last_learning_date: string | null;
  plan: string | null;
  profile_skills: ProfileSkillRelation[] | null;
};

type CourseRelation = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  lessons_count: number;
};

type UserCourseRow = {
  course_id: string;
  status: string;
  progress_percent: number;
  updated_at: string;
  courses: CourseRelation | CourseRelation[] | null;
};

type LessonProgressRow = {
  course_id: string;
  lesson_id: string;
  completed_at: string;
};

type CourseModuleRelation = {
  title: string;
  position: number;
};

type CourseLessonRow = {
  id: string;
  course_id: string;
  slug: string | null;
  title: string;
  summary: string;
  position: number;
  course_modules: CourseModuleRelation | CourseModuleRelation[] | null;
};

type ChallengeRelation = {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  xp_reward: number;
};

type UserChallengeRow = {
  challenge_id: string;
  status: string;
  progress_percent: number;
  solution_text: string | null;
  ai_feedback?: string | null;
  ai_verdict?: string | null;
  completed_at: string | null;
  updated_at: string;
  challenges: ChallengeRelation | ChallengeRelation[] | null;
};

type ActivityLogRow = {
  type: string;
  title: string;
  description: string | null;
  created_at: string;
};

const MAX_CONTEXT_COURSES = 4;
const MAX_CONTEXT_CHALLENGES = 4;
const MAX_CONTEXT_ACTIVITIES = 5;
const MAX_TEXT_PREVIEW_LENGTH = 320;

export async function getAiMentorLearningContext(
  profileId: string
): Promise<string> {
  const supabase = await createClient();

  const [
    profileResult,
    coursesResult,
    challengesResult,
    completedChallengesResult,
    activityResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
        full_name,
        username,
        role,
        level,
        xp,
        xp_goal,
        streak_days,
        last_learning_date,
        plan,
        profile_skills (
          skills (name)
        )
      `
      )
      .eq("id", profileId)
      .maybeSingle(),
    supabase
      .from("user_courses")
      .select(
        `
        course_id,
        status,
        progress_percent,
        updated_at,
        courses (
          id,
          slug,
          title,
          category,
          level,
          lessons_count
        )
      `
      )
      .eq("profile_id", profileId)
      .order("updated_at", { ascending: false })
      .limit(MAX_CONTEXT_COURSES),
    getUserChallenges(profileId),
    supabase
      .from("user_challenges")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId)
      .eq("status", "completed"),
    supabase
      .from("activity_logs")
      .select("type, title, description, created_at")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(MAX_CONTEXT_ACTIVITIES),
  ]);

  const profile = profileResult.data as ProfileRow | null;
  const userCourses = (coursesResult.data ?? []) as UserCourseRow[];
  const userChallenges = challengesResult;
  const recentActivities = (activityResult.data ?? []) as ActivityLogRow[];
  const courseContext = await getCourseContext(profileId, userCourses);

  return [
    "MindForge platform context for this learner:",
    getProfileContext(profile),
    courseContext,
    getChallengeContext(userChallenges, completedChallengesResult.count ?? 0),
    getActivityContext(recentActivities),
  ]
    .filter(Boolean)
    .join("\n\n");
}

async function getCourseContext(
  profileId: string,
  userCourses: UserCourseRow[]
): Promise<string> {
  if (!userCourses.length) {
    return "Courses: The learner has no active courses connected yet.";
  }

  const supabase = await createClient();
  const courseIds = userCourses.map((course) => course.course_id);

  const [lessonsResult, completedLessonsResult] = await Promise.all([
    supabase
      .from("course_lessons")
      .select(
        `
        id,
        course_id,
        slug,
        title,
        summary,
        position,
        course_modules (
          title,
          position
        )
      `
      )
      .in("course_id", courseIds),
    supabase
      .from("user_lesson_progress")
      .select("course_id, lesson_id, completed_at")
      .eq("profile_id", profileId)
      .in("course_id", courseIds),
  ]);

  const lessons = ((lessonsResult.data ?? []) as CourseLessonRow[]).sort(
    sortLessons
  );
  const completedLessons = (completedLessonsResult.data ??
    []) as LessonProgressRow[];
  const completedLessonIds = new Set(
    completedLessons.map((lesson) => lesson.lesson_id)
  );

  const courseLines = userCourses.flatMap((userCourse) => {
    const course = getRelation(userCourse.courses);

    if (!course) {
      return [];
    }

    const courseLessons = lessons.filter(
      (lesson) => lesson.course_id === course.id
    );
    const completedCount = courseLessons.filter((lesson) =>
      completedLessonIds.has(lesson.id)
    ).length;
    const nextLesson = courseLessons.find(
      (lesson) => !completedLessonIds.has(lesson.id)
    );
    const lastCompletedLesson = [...completedLessons]
      .filter((lesson) => lesson.course_id === course.id)
      .sort((first, second) =>
        second.completed_at.localeCompare(first.completed_at)
      )[0];
    const lastCompletedLessonDetails = lastCompletedLesson
      ? courseLessons.find((lesson) => lesson.id === lastCompletedLesson.lesson_id)
      : null;

    return [
      [
        `Course: ${course.title}`,
        `Category: ${course.category}`,
        `Level: ${course.level}`,
        `Status: ${userCourse.status}`,
        `Progress: ${userCourse.progress_percent}%`,
        `Lessons completed: ${completedCount}/${course.lessons_count}`,
        `Last completed lesson: ${
          lastCompletedLessonDetails?.title ?? "none yet"
        }`,
        `Recommended next lesson: ${nextLesson?.title ?? "course completed"}`,
        nextLesson?.summary
          ? `Next lesson summary: ${truncateText(nextLesson.summary)}`
          : null,
      ]
        .filter(Boolean)
        .join("; "),
    ];
  });

  if (!courseLines.length) {
    return "Courses: The learner has started courses, but course details are not available.";
  }

  return [
    "Courses:",
    ...courseLines.map((line, index) => `${index + 1}. ${line}`),
  ].join("\n");
}

async function getUserChallenges(
  profileId: string
): Promise<UserChallengeRow[]> {
  const supabase = await createClient();
  const query = supabase
    .from("user_challenges")
    .select(
      `
      challenge_id,
      status,
      progress_percent,
      solution_text,
      ai_feedback,
      ai_verdict,
      completed_at,
      updated_at,
      challenges (
        id,
        slug,
        title,
        category,
        difficulty,
        xp_reward
      )
    `
    )
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false })
    .limit(MAX_CONTEXT_CHALLENGES);

  const result = await query;

  if (!result.error) {
    return (result.data ?? []) as UserChallengeRow[];
  }

  const fallbackResult = await supabase
    .from("user_challenges")
    .select(
      `
      challenge_id,
      status,
      progress_percent,
      solution_text,
      completed_at,
      updated_at,
      challenges (
        id,
        slug,
        title,
        category,
        difficulty,
        xp_reward
      )
    `
    )
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false })
    .limit(MAX_CONTEXT_CHALLENGES);

  return (fallbackResult.data ?? []) as UserChallengeRow[];
}

function getProfileContext(profile: ProfileRow | null): string {
  if (!profile) {
    return "Profile: No profile row is available yet.";
  }

  const skills = (profile.profile_skills ?? [])
    .map((item) => getRelation(item.skills)?.name)
    .filter(Boolean);

  return [
    "Profile:",
    `Name: ${profile.full_name ?? profile.username ?? "unknown"}`,
    `Role: ${profile.role ?? "not set"}`,
    `Plan: ${profile.plan ?? "free"}`,
    `Level: ${profile.level ?? 1}`,
    `XP: ${profile.xp ?? 0}/${profile.xp_goal ?? 1000}`,
    `Current streak: ${getCurrentStreakDays(profile)} days`,
    `Last learning date: ${profile.last_learning_date ?? "none"}`,
    `Skills: ${skills.length ? skills.join(", ") : "none added yet"}`,
  ].join("\n");
}

function getChallengeContext(
  userChallenges: UserChallengeRow[],
  completedCount: number
): string {
  if (!userChallenges.length) {
    return `Challenges: ${completedCount} completed. No recent challenge activity.`;
  }

  const challengeLines = userChallenges.flatMap((userChallenge) => {
    const challenge = getRelation(userChallenge.challenges);

    if (!challenge) {
      return [];
    }

    return [
      [
        `Challenge: ${challenge.title}`,
        `Category: ${challenge.category}`,
        `Difficulty: ${challenge.difficulty}`,
        `Status: ${userChallenge.status}`,
        `Progress: ${userChallenge.progress_percent}%`,
        `XP reward: ${challenge.xp_reward}`,
        userChallenge.ai_verdict
          ? `Last AI verdict: ${userChallenge.ai_verdict}`
          : null,
        userChallenge.ai_feedback
          ? `Last AI feedback: ${truncateText(userChallenge.ai_feedback)}`
          : null,
        userChallenge.completed_at
          ? `Completed at: ${userChallenge.completed_at}`
          : null,
      ]
        .filter(Boolean)
        .join("; "),
    ];
  });

  return [
    `Challenges: ${completedCount} completed in total.`,
    ...challengeLines.map((line, index) => `${index + 1}. ${line}`),
  ].join("\n");
}

function getActivityContext(recentActivities: ActivityLogRow[]): string {
  if (!recentActivities.length) {
    return "Recent activity: No recent activity logs.";
  }

  return [
    "Recent activity:",
    ...recentActivities.map((activity, index) =>
      [
        `${index + 1}. ${activity.title}`,
        `Type: ${activity.type}`,
        activity.description ? `Description: ${activity.description}` : null,
        `Date: ${activity.created_at}`,
      ]
        .filter(Boolean)
        .join("; ")
    ),
  ].join("\n");
}

function sortLessons(first: CourseLessonRow, second: CourseLessonRow): number {
  const firstModule = getRelation(first.course_modules);
  const secondModule = getRelation(second.course_modules);
  const moduleOrder = (firstModule?.position ?? 0) - (secondModule?.position ?? 0);

  if (moduleOrder !== 0) {
    return moduleOrder;
  }

  return first.position - second.position;
}

function getCurrentStreakDays(profile: ProfileRow): number {
  const today = getDateKey(new Date());
  const yesterday = getDateKey(addDays(new Date(), -1));

  if (
    profile.last_learning_date === today ||
    profile.last_learning_date === yesterday
  ) {
    return profile.streak_days ?? 0;
  }

  return 0;
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function truncateText(value: string): string {
  return value.length > MAX_TEXT_PREVIEW_LENGTH
    ? `${value.slice(0, MAX_TEXT_PREVIEW_LENGTH)}...`
    : value;
}

function getRelation<T>(relation: T | T[] | null | undefined): T | null {
  return Array.isArray(relation) ? relation[0] ?? null : relation ?? null;
}
