import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Hàm upload file lên Supabase Storage
  const handleUpload = async (file, folder) => {
    if (!file) return "";

    if (file.size > 15 * 1024 * 1024) {
      alert("File quá lớn! Giới hạn 15MB.");
      return "";
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return "";
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`;
  };

  // Xử lý đăng bài
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      alert("Bạn cần đăng nhập để đăng bài!");
      setLoading(false);
      return;
    }

    const imageUrl = await handleUpload(image, "images");
    const videoUrl = await handleUpload(video, "videos");

    const { error } = await supabase
      .from("posts")
      .insert([{ user_id: user.id, content, image: imageUrl, video: videoUrl }]);

    setLoading(false);

    if (error) {
      alert("Lỗi đăng bài: " + error.message);
    } else {
      alert("Đăng bài thành công!");
      router.push("/");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng bài</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Bạn đang nghĩ gì?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng..." : "Đăng bài"}
        </button>
      </form>
    </div>
  );
}