import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("profiles").select("username").eq("id", user.id).single();
      if (!data?.username && router.pathname !== "/update-profile") {
        router.push("/update-profile");
      }
    }
    checkProfile();
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;