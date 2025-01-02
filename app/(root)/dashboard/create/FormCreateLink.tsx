"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createLink, getLinksByShortUrl } from "@/utils/linkUtils";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must not exceed 50 characters"),
  originalUrl: z.string().url("Please enter a valid URL"),
  shortUrl: z.string().min(2, "Short URL must be at least 2 characters"),
  is_public: z.preprocess((value) => value === "true", z.boolean()),
  tags: z.array(z.string()).optional(),
});

export default function FormCreateLink({ userId }: { userId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
      shortUrl: "",
      is_public: true,
      tags: [],
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && tagInput.trim() !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const linkData = {
        title: values.title,
        originalUrl: values.originalUrl,
        shortUrl: values.shortUrl,
        is_public: values.is_public,
        tags: tags,
      };

      console.log("Link data:", linkData);

      const linkAvailable = await getLinksByShortUrl(values.shortUrl);

      if (linkAvailable) {
        throw new Error("Short URL already exists. Please choose another one.");
      } else {
        const createdLink = await createLink(userId, linkData);
        toast.success("Link created successfully!");
        form.reset();
        setTags([]);
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error creating link:", error);

      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Input title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Url</FormLabel>
              <FormControl>
                <Input placeholder="Input original url here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Url</FormLabel>
              <FormControl>
                <Input placeholder="Input short url here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_public"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accessibility</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={"true"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accessibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Public</SelectItem>
                  <SelectItem value="false">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Input
              placeholder="Input tags here and press space..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </FormControl>
          <FormDescription>
            Separate tags with space (e.g., "tag1 tag2 tag3").
          </FormDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded text-gray-800 hover:text-white"
              >
                <span>{tag}</span>
                <X
                  className="cursor-pointer"
                  size={16}
                  onClick={() => handleRemoveTag(index)}
                />
              </Badge>
            ))}
          </div>
          <FormMessage />
        </FormItem>
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Link
            href={`/dashboard`}
            className="border-gray-500 hover:bg-gray-100 px-4 py-2 border rounded-md"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}
