function Post({ post }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from("profiles") // Lấy từ bảng profiles thay vì auth.users
        .select("username")
        .eq("id", post.user_id)
        .single();
      
      if (!error) setUser(data);
    }
    fetchUser();
  }, [post.user_id]);

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <p><strong>{user?.username || "Ẩn danh"}</strong></p>
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