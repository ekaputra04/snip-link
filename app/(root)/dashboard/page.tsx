import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormCreateLink from "./FormCreateLink";

export default function DashboardPage() {
  return (
    <>
      <div className="flex justify-between items-center pt-8 w-full">
        <h1>Dashboard</h1>
        <Link href="/dashboard/create">
          <Button>Create Link</Button>
        </Link>
      </div>
    </>
  );
}
