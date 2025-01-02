import { notFound, redirect } from "next/navigation";
import { getLinksByShortUrl } from "@/utils/linkUtils";

export default async function RedirectPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  const link = await getLinksByShortUrl(params.shortUrl);

  if (!link) {
    notFound();
  }

  redirect(link.originalUrl);
}
