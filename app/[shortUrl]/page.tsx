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

  if (link.is_public === false) {
    notFound();
  }

  redirect(link.originalUrl);
}
