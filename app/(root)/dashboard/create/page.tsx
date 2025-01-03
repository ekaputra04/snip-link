import FormCreateLink from "./FormCreateLink";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { headers } from "next/headers";

/**
 * Page for creating a new link.
 *
 * Checks if the user is authorized to view the page by checking the
 * `x-user-id` header. If the user is unauthorized, it displays an
 * "Unauthorized" message.
 *
 * Otherwise, it displays a form for creating a new link.
 * The form is provided by the `FormCreateLink` component.
 * The `userId` prop is passed to the form, which is used to associate
 * the link with the logged-in user.
 *
 * The page also displays a link to the dashboard page, and a title for
 * the page.
 */
export default async function CreatePage() {
  const headersList = headers();
  const userId = (await headersList).get("x-user-id");

  if (!userId) {
    return <p>Unauthorized</p>;
  }

  return (
    <>
      <div className="flex justify-start items-center gap-2 py-8 pt-8 w-full">
        <Link href="/dashboard" className="font-bold text-2xl hover:underline">
          Dashboard
        </Link>

        <ChevronRight />

        <h1 className="font-bold text-2xl">Create Link</h1>
      </div>

      <div className="dark:border-white p-8 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
        {userId && <FormCreateLink userId={userId} />}
      </div>
    </>
  );
}
