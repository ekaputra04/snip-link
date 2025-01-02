import { notFound, redirect } from "next/navigation";
import { getLinksByShortUrl } from "@/utils/linkUtils";

export default async function RedirectPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  const shortUrl = (await params).shortUrl;
  const link = await getLinksByShortUrl(shortUrl);

  if (!link) {
    notFound();
  }

  redirect(link.originalUrl);
}
