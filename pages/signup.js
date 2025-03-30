import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(`Lỗi: ${error.message}`);
    } else {
      setMessage("Đăng ký thành công! Kiểm tra email để xác nhận.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Nhập email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng Ký"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}