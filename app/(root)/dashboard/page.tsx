import { getLinks } from "@/utils/linkUtils";
import { headers } from "next/headers";
import DashboardView from "./DashboardView";

/**
 * Dashboard page component.
 *
 * This function fetches and displays the user's links in the dashboard view.
 * It first retrieves the `x-user-id` from the request headers to identify the user.
 * If the user is not authenticated, it returns an "Unauthorized" message.
 * Otherwise, it fetches the user's links using the `getLinks` utility function
 * and renders the `DashboardView` component with the fetched links and userId.
 */

export default async function DashboardPage() {
  const headersList = headers();
  const userId = (await headersList).get("x-user-id");

  if (!userId) {
    return <p>Unauthorized</p>;
  }

  const links = await getLinks(userId);

  return (
    <>
      <DashboardView links={links} userId={userId} />
    </>
  );
}
