"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, Globe, Pencil, Tag, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DashboardViewProps {
  id: number;
  slug: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  is_public: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardViewComponentProps {
  links: DashboardViewProps[];
}
const url = process.env.NEXT_PUBLIC_URL;

export default function DashboardView({ links }: DashboardViewComponentProps) {
  const handleCopyClick = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(url + shortUrl);
      toast.success("Short URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy short URL:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-8 pt-8 w-full">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <Link href="/dashboard/create">
          <Button variant={"comic"}>Create Link</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {links.length > 0 ? (
          links.map((link) => (
            <div
              className="p-4 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-xl"
              key={link.id}
            >
              <div className="flex items-start gap-4">
                <div className="w-fit">
                  <Globe size={32} />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-xl hover:underline">
                      {link.title}
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        className="gap-2"
                        onClick={() => handleCopyClick(link.shortUrl)}
                      >
                        <Copy className="w-4 h-4" /> <span>Copy</span>
                      </Button>
                      <Link href={`/dashboard/edit/${link.slug}`}>
                        <Button
                          className="border-green-500 bg-green-100 hover:bg-green-200"
                          variant={"outline"}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        className="bg-red-100 hover:bg-red-200 border-red-500"
                        variant={"outline"}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Link
                    href={url + link.shortUrl}
                    className="text-blue-500 hover:underline"
                  >
                    {url + link.shortUrl}
                  </Link>
                  <Link href={link.originalUrl} className="hover:underline">
                    {link.originalUrl}
                  </Link>
                  <div className="flex space-x-4 pt-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <p>{new Date(link.createdAt).toLocaleDateString()}</p>
                    </div>
                    {link.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        {link.tags.map((tag, index) => (
                          <Badge key={index}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p>
              No links found, create your{" "}
              <Link
                href="/dashboard/create"
                className="font-bold hover:underline"
              >
                first link
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </>
  );
}
