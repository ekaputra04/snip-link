import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <div className="flex justify-start items-center gap-2 py-8 pt-8 w-full">
        <Link href="/dashboard" className="font-bold text-2xl hover:underline">
          Dashboard
        </Link>
        <ChevronRight />
        <h1 className="font-bold text-2xl">Edit Link</h1>
      </div>
      <p>{slug}</p>
      <h1>Edit Page</h1>
    </>
  );
}
