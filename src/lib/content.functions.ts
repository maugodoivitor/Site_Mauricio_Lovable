import { createServerFn } from "@tanstack/react-start";
import { createPublicSupabase } from "./publicSupabase.server";

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, category, excerpt, cover_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = createPublicSupabase();
    const { data: post, error } = await supabase
      .from("posts")
      .select("id, slug, title, category, excerpt, content, cover_url, published_at")
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post;
  });

export const listInterviews = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from("interviews")
    .select("id, title, outlet, kind, url, description, thumbnail_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});