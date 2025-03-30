import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, user_id, content, image, video, created_at");

      if (!error) setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bài viết mới</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function Post({ post }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase
        .from("auth.users")
        .select("email")
        .eq("id", post.user_id)
        .single();
      setUser(data);
    }
    fetchUser();
  }, [post.user_id]);

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <p><strong>{user?.email || "Ẩn danh"}</strong></p>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Ảnh bài viết" style={{ maxWidth: "100%" }} />}
      {post.video && (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={post.video} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      )}
      <p><small>{new Date(post.created_at).toLocaleString()}</small></p>
    </div>
  );
}