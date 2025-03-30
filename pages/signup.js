import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Đăng ký user với Supabase Auth
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Lỗi đăng ký: " + error.message);
      setLoading(false);
      return;
    }

    // Lưu thông tin user vào bảng profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: user.id, username: email.split("@")[0] }]);

    if (profileError) {
      alert("Lỗi tạo profile: " + profileError.message);
    }

    alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
    router.push("/login"); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}