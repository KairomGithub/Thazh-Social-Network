import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { getPosts } from "../utils/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Lấy bài đăng của user
        getPosts().then((allPosts) => {
          const myPosts = allPosts.filter((post) => post.user_id === user.id);
          setPosts(myPosts);
        });
      }
    }
    fetchUser();
  }, []);

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trang Cá Nhân</h1>
      <p>Email: {user.email}</p>
      <h2>Bài đăng của tôi</h2>
      {posts.length ? (
        posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>Chưa có bài đăng nào!</p>
      )}
    </div>
  );
}