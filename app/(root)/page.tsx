import Hero from "@/components/hero";
import Navbar from "@/components/Navbar";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-20 p-5 max-w-5xl">
        <Hero />
        <main className="flex flex-col flex-1 gap-6 px-4">
          <h2 className="mb-4 font-medium text-xl">Next steps</h2>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>
    </>
  );
}
