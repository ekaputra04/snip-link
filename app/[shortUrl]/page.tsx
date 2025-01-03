import { notFound, redirect } from "next/navigation";
import { getLinksByShortUrl } from "@/utils/linkUtils";

/**
 * RedirectPage
 *
 * This page redirects to the original URL of a short link with the given shortUrl.
 * If the link does not exist, it returns a 404 status code.
 * If the link is not public, it also returns a 404 status code.
 * @param {{ params: Promise<{ shortUrl: string }> }} props - The props passed to the page.
 * @returns {Promise<NextResponse | Redirect>} - The response to return to the client.
 */
export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
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
