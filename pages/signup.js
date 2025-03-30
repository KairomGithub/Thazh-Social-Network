import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Xử lý đăng ký bằng email
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data: { user }, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push("/update-profile");
    }
  };

  // Xử lý đăng nhập bằng Google / GitHub
  const handleOAuthSignUp = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) alert(error.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng ký</h1>

      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Đăng ký</button>
      </form>

      <hr />

      <button onClick={() => handleOAuthSignUp("google")}>Đăng ký với Google</button>
      <button onClick={() => handleOAuthSignUp("github")}>Đăng ký với GitHub</button>

      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
}