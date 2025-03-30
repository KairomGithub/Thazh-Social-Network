import { likePost, commentPost } from "../utils/api";
import { formatDate } from "../utils/format";
import { useState } from "react";

export default function Post({ post }) {
  const [comment, setComment] = useState("");

  // Ví dụ: Thả tim khi bấm nút (giả định userId nằm trong post, hoặc lấy từ auth)
  const handleLike = () => {
    // Thêm hàm like theo userId thực tế
    likePost(post.user_id, post.id);
  };

  const handleComment = () => {
    if (comment.trim()) {
      commentPost(post.user_id, post.id, comment);
      setComment("");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
      <p>{post.content}</p>
      {post.media_url && (
        <img src={post.media_url} alt="Media" style={{ maxWidth: "100%" }} />
      )}
      <p style={{ fontSize: "0.9em", color: "#555" }}>
        Đăng lúc: {formatDate(post.created_at)}
      </p>
      <button onClick={handleLike}>❤️ Like</button>
      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Bình luận</button>
      </div>
    </div>
  );
  }
