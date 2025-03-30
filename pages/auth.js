import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Đăng ký tài khoản
  const signUp = async () => {
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      await supabase.from("profiles").insert([{ id: user.id, username: email.split("@")[0] }]);
      alert("Đăng ký thành công! Hãy kiểm tra email.");
    }
  };

  // Đăng nhập tài khoản
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Đăng nhập thành công!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Đăng nhập / Đăng ký</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUp}>Đăng ký</button>
      <button onClick={signIn}>Đăng nhập</button>
    </div>
  );
}