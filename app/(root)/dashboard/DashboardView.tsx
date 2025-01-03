"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Copy,
  Globe,
  Pencil,
  RefreshCw,
  Tag,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteLink, getLinks } from "@/utils/linkUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { LinkType } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardViewProps {
  links: LinkType[];
  userId: string;
}
const url = process.env.NEXT_PUBLIC_URL;

export default function DashboardView({ links, userId }: DashboardViewProps) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState<LinkType[]>(links);
  const [accessibility, setAccessibility] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const uniqueTags = Array.from(new Set(links.flatMap((link) => link.tags)));

  const getLinksData = async () => {
    try {
      setLoading(true);
      const links = await getLinks(userId);
      setFilteredLinks(links);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch links : ", error);
      setLoading(false);
    }
  };

  const handleCopyClick = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(url + shortUrl);
      toast.success("Short URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy short URL:", error);
    }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      const deletedLink = await deleteLink(id);
      toast.success("Link deleted successfully");
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    const lowercasedQuery = query.toLowerCase();

    const filtered = links.filter((link) => {
      const matchesQuery = link.title.toLowerCase().includes(lowercasedQuery);
      const matchesAccessibility =
        accessibility === "all" ||
        (accessibility === "true" && link.is_public) ||
        (accessibility === "false" && !link.is_public);
      const matchesTag = tagFilter === "all" || link.tags.includes(tagFilter);

      return matchesQuery && matchesAccessibility && matchesTag;
    });

    setFilteredLinks(filtered);
    setLoading(false);
  }, [query, accessibility, tagFilter, links]);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center space-y-4 pt-8 pb-4 w-full">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <Button
            className="bg-white hover:bg-white dark:hover:bg-black dark:bg-black text-black dark:text-white"
            onClick={() => getLinksData()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link href="/dashboard/create">
            <Button variant={"comic"}>Create Link</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center pb-8 md:pb-0">
        <div className="flex md:flex-row flex-col justify-start md:items-center gap-4 pt-4 pb-8">
          <div className="flex justify-start items-center space-x-4">
            <p>Filter by accessibility : </p>
            <Select
              onValueChange={(value) => setAccessibility(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by accessibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Public</SelectItem>
                <SelectItem value="false">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-start items-center gap-4">
            <p>Filter by tag : </p>

            <Select
              onValueChange={(value) => setTagFilter(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p>
          {filteredLinks.length} of {links.length} links shown{" "}
        </p>
      </div>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {links.length === 0 && (
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
            )}
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <div
                  className="p-4 border-t-2 border-r-8 border-b-8 border-black border-l-2 rounded-xl"
                  key={link.id}
                >
                  <div className="flex items-start gap-4">
                    <div className="md:block hidden w-fit">
                      <Globe size={32} />
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                      <div className="flex justify-between md:items-center md:space-x-4">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-xl hover:underline">
                            {link.title}
                          </h4>
                          {link.is_public ? (
                            <>
                              <Badge className="border-green-500 bg-green-100 hover:bg-green-200 text-black">
                                Public
                              </Badge>
                            </>
                          ) : (
                            <Badge className="bg-red-100 hover:bg-red-200 border-red-500 text-black">
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            className="gap-2"
                            onClick={() => handleCopyClick(link.shortUrl)}
                          >
                            <Copy className="w-4 h-4" /> <span>Copy</span>
                          </Button>
                          <Link
                            href={`/dashboard/edit/${link.slug}`}
                            className="md:block hidden"
                          >
                            <Button
                              className="border-green-500 bg-green-100 hover:bg-green-200"
                              variant={"outline"}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger className="md:block hidden bg-red-100 hover:bg-red-200 px-4 py-2 border border-red-500 rounded-md">
                              <Trash className="w-4 h-4" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure to delete {link.title}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this link from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteLink(link.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <Link
                        href={url + link.shortUrl}
                        className="flex-wrap text-blue-500 hover:underline"
                      >
                        {url + link.shortUrl}
                      </Link>
                      <Link
                        href={link.originalUrl}
                        className="hover:underline break-words"
                      >
                        {link.originalUrl}
                      </Link>
                      <div className="flex md:flex-row flex-col md:space-x-4 space-y-2 pt-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <p>{new Date(link.updatedAt).toLocaleString()}</p>
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
                      <div className="flex justify-end gap-2 md:hidden w-full">
                        <Link href={`/dashboard/edit/${link.slug}`}>
                          <Button
                            className="border-green-500 bg-green-100 hover:bg-green-200"
                            variant={"outline"}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger className="bg-red-100 hover:bg-red-200 px-4 py-2 border border-red-500 rounded-md">
                            <Trash className="w-4 h-4" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure to delete {link.title}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this link from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteLink(link.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No links found</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
