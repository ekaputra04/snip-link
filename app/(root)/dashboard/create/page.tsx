import { createClient } from "@/utils/supabase/server";
import FormCreateLink from "./FormCreateLink";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function CreatePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex justify-start items-center gap-2 py-8 pt-8 w-full">
        <Link href="/dashboard" className="font-bold text-2xl hover:underline">
          Dashboard
        </Link>

        <ChevronRight />

        <h1 className="font-bold text-2xl">Create Link</h1>
      </div>

      <div className="p-8 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
        {user && <FormCreateLink userId={user.id} />}
      </div>
    </>
  );
}
