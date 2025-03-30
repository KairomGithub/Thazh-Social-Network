import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Xử lý đăng nhập bằng email
  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  // Xử lý đăng nhập bằng Google / GitHub
  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) alert(error.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng nhập</h1>

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Đăng nhập</button>
      </form>

      <hr />

      <button onClick={() => handleOAuthLogin("google")}>Đăng nhập với Google</button>
      <button onClick={() => handleOAuthLogin("github")}>Đăng nhập với GitHub</button>

      <p>Chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
    </div>
  );
}