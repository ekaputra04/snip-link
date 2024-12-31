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
import { createLink } from "@/app/utils/linkUtils";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must not exceed 50 characters"),
  originalUrl: z.string().url("Please enter a valid URL"),
  shortUrl: z.string().min(2, "Short URL must be at least 2 characters"),
  tags: z
    .string()
    .optional()
    .transform((value) => (value ? value.split(" ") : [])), // Transform tags input into an array of strings
});

export default function FormCreateLink() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
      shortUrl: "",
      tags: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const userId = 1; // Replace with the actual user ID from context/auth
      const linkData = {
        title: values.title,
        originalUrl: values.originalUrl,
        shortUrl: values.shortUrl,
        tags: values.tags,
      };

      await createLink(userId, linkData);
      alert("Link created successfully!");
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error creating link:", error);
      setErrorMessage("Failed to create link. Please try again.");
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (separated by space)</FormLabel>
              <FormControl>
                <Input placeholder="Input tags here..." {...field} />
              </FormControl>
              <FormDescription>
                Separate tags with spaces (e.g., "tag1 tag2 tag3").
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
