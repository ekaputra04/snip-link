import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col flex-1 gap-12 w-full">
      <div className="w-full">
        <div className="flex items-center gap-3 bg-accent px-5 p-3 rounded-md text-foreground text-sm">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 font-bold text-2xl">Your user details</h2>
        <pre className="p-3 border rounded max-h-32 font-mono text-xs overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="mb-4 font-bold text-2xl">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}
