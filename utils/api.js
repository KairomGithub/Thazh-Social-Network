import { supabase } from "./supabaseClient";

// Lấy danh sách bài viết (mới nhất trước)
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) console.error("Lỗi lấy bài viết:", error);
  return data;
}

// Đăng bài mới
export async function createPost(userId, content, mediaUrl) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ user_id: userId, content, media_url: mediaUrl }]);
  if (error) console.error("Lỗi đăng bài:", error);
  return data;
}

// Like bài viết
export async function likePost(userId, postId) {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ user_id: userId, post_id: postId }]);
  if (error) console.error("Lỗi like bài viết:", error);
  return data;
}

// Bình luận bài viết
export async function commentPost(userId, postId, content) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ user_id: userId, post_id: postId, content }]);
  if (error) console.error("Lỗi bình luận:", error);
  return data;
    }
