import { getLinksByUser } from "@/app/utils/linkUtils";
import { headers } from "next/headers";
import DashboardView from "./DashboardView";

export default async function DashboardPage() {
  const headersList = headers();
  const userId = (await headersList).get("x-user-id"); // Ambil header dari response middleware

  if (!userId) {
    return <p>Unauthorized</p>;
  }

  // Ambil data links dari server
  const links = await getLinksByUser(userId);

  return (
    <>
      <DashboardView links={links} />
    </>
  );
}
