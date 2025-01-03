import Hero from "@/components/hero";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useUserStore } from "../store/userStore";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const setUser = useUserStore.getState().setUser;
  setUser(user);
  return (
    <>
      <div className="flex flex-col gap-8 py-8">
        <Hero />
      </div>
    </>
  );
}
