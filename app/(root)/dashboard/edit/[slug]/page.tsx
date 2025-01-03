import { getLinksBySlug } from "@/utils/linkUtils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import FormEditLink from "./FormEditLink";

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
