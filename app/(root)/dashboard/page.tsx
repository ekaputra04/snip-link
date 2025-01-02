import { getLinks } from "@/utils/linkUtils";
import { headers } from "next/headers";
import DashboardView from "./DashboardView";

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
