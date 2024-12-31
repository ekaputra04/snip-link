"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardView() {
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
