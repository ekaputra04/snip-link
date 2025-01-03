import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { EnvVarWarning } from "./env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Navbar() {
  return (
    <>
      <nav className="z-50 flex justify-center dark:border-white border-b-2 border-black w-full h-16">
        <div className="flex justify-between items-center py-3 w-full text-sm">
          <div className="flex items-center gap-5 font-semibold">
            <Link href={"/"}>Snip Link</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
        </div>
      </nav>
    </>
  );
}
