import { getLinksBySlug } from "@/utils/linkUtils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import FormEditLink from "./FormEditLink";

/**
 * The page for editing a link.
 *
 * This page displays a form that allows the user to edit the details of a link
 * that they have created. The form includes fields for the link's title, short
 * URL, original URL, and accessiblity. The page also displays a message if the
 * user is not logged in or if the link is not found.
 *
 * @param {{ params: Promise<{ slug: string }> }} props - The props passed to
 * the page. The `params` prop is a promise that resolves to an object with a
 * `slug` property that contains the slug of the link to edit.
 * @returns {React.ReactNode} - The React node to render for the page.
 */
export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const link = await getLinksBySlug(slug);

  if (!link) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Link not found</p>
      </div>
    );
  }

  if (link && !link.authorId) {
    throw new Error("Author ID is missing.");
  }

  return (
    <>
      <div className="flex justify-start items-center gap-2 py-8 pt-8 w-full">
        <Link href="/dashboard" className="font-bold text-2xl hover:underline">
          Dashboard
        </Link>
        <ChevronRight />
        <h1 className="font-bold text-2xl">Edit Link</h1>
      </div>
      {link ? (
        <>
          <div className="dark:border-white p-8 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-3xl">
            <FormEditLink link={{ ...link, authorId: link.authorId || "" }} />
          </div>
        </>
      ) : (
        <>
          <p>Link not found</p>
        </>
      )}
    </>
  );
}
