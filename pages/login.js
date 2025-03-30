import { signInWithGoogle, signInWithGitHub, signOut } from "../utils/auth";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link"; // Thêm Link để chuyển sang trang đăng ký

export default function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng nhập</h1>
      {user ? (
        <>
          <p>Xin chào, {user.email}</p>
          <button onClick={signOut}>Đăng xuất</button>
        </>
      ) : (
        <>
          <button onClick={signInWithGoogle}>Đăng nhập bằng Google</button>
          <button onClick={signInWithGitHub}>Đăng nhập bằng GitHub</button>
          <p>Chưa có tài khoản? <Link href="/signup">Đăng ký ngay</Link></p>
        </>
      )}
    </div>
  );
}