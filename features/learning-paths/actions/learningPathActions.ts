"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function startLearningPath(formData: FormData) {
  const pathId = String(formData.get("pathId") ?? "");
  const pathSlug = String(formData.get("pathSlug") ?? "");

  if (!pathId || !pathSlug) {
    throw new Error("Missing learning path data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: path } = await supabase
    .from("learning_paths")
    .select("id, title")
    .eq("id", pathId)
    .eq("slug", pathSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!path) {
    throw new Error("Learning path not found.");
  }

  const { data: existingPath } = await supabase
    .from("user_learning_paths")
    .select("id")
    .eq("profile_id", user.id)
    .eq("learning_path_id", pathId)
    .maybeSingle();

  if (!existingPath) {
    const { error } = await supabase.from("user_learning_paths").insert({
      profile_id: user.id,
      learning_path_id: pathId,
      status: "in_progress",
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error("Could not start learning path.");
    }

    await supabase.from("activity_logs").insert({
      profile_id: user.id,
      type: "learning_path_started",
      title: `Started "${path.title}"`,
      description: "Learning path added to your roadmap",
      metadata: {
        learning_path_id: pathId,
        learning_path_slug: pathSlug,
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/learning-paths");
  redirect("/learn/learning-paths");
}
