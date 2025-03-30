import { supabase } from "./supabaseClient";


// Đăng ký bằng email & nhận link OTP để xác nhận
export async function signUpWithEmail(email) {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) console.error("Lỗi đăng ký bằng email OTP:", error);
}

// Đăng nhập bằng Google
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
  if (error) console.error("Lỗi đăng nhập Google:", error);
}

// Đăng nhập bằng GitHub
export async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
  if (error) console.error("Lỗi đăng nhập GitHub:", error);
}

// Đăng nhập bằng Email (OTP)
export async function signInWithEmail(email) {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) console.error("Lỗi đăng nhập Email:", error);
}

// Đăng xuất
export async function signOut() {
  await supabase.auth.signOut();
}