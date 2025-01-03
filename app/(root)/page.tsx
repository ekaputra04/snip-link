import Hero from "@/components/hero";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useUserStore } from "../store/userStore";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";

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
      <div className="top-0 right-0 bottom-0 left-0 -z-50 fixed w-full h-screen">
        <BackgroundBeams />
      </div>
      <Spotlight className="-top-72 -left-64 -z-40" fill="blue" />
    </>
  );
}
