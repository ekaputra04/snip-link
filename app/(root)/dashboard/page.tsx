import { getLinksByUser } from "@/app/utils/linkUtils";
import DashboardView from "./DashboardView";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const headersList = headers();
  const userId = (await headersList).get("x-user-id"); // Ambil header dari response middleware

  if (!userId) {
    return <p>Unauthorized</p>;
  }

  const links = await getLinksByUser(userId);

  return (
    <div>
      <h1>Welcome, User {userId}</h1>
      <p>{JSON.stringify(links, null, 2)}</p>
      <DashboardView />
    </div>
  );
}
