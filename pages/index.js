import { useEffect, useState } from "react";
import { getPosts } from "../utils/api";
import Post from "../components/Post";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trang Chủ</h1>
      {posts?.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Không có bài viết nào!</p>
      )}
    </div>
  );
            }
