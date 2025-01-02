"use server";

import { PrismaClient, Link } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const prisma = new PrismaClient();

export const getLinks = unstable_cache(
  async (userId: string) => {
    return await prisma.link.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });
  },
  ["links"],
  { revalidate: 3600, tags: ["links"] }
);

export const getLinksBySlug = async (slug: string): Promise<Link | null> => {
  try {
    return await prisma.link.findFirst({
      where: { slug: slug },
    });
  } catch (error) {
    console.error("Error fetching link:", error);
    throw new Error("Unable to fetch link");
  }
};

export const getLinksByShortUrl = async (
  shortUrl: string
): Promise<Link | null> => {
  try {
    return await prisma.link.findFirst({
      where: { shortUrl: shortUrl },
    });
  } catch (error) {
    console.error("Error fetching link:", error);
    throw new Error("Unable to fetch link");
  }
};

/**
 * Create a new link for the logged-in user.
 * @param userId - ID of the logged-in user.
 * @param linkData - Data for the new link.
 * @returns Promise<Link> - Created link.
 */
export const createLink = async (
  userId: string,
  linkData: {
    title: string;
    originalUrl: string;
    shortUrl: string;
    is_public: boolean;
    tags?: string[];
  }
): Promise<Link> => {
  try {
    const link = await prisma.link.create({
      data: {
        ...linkData,
        authorId: userId,
      },
    });

    revalidateTag("links");

    return link;
  } catch (error) {
    console.error("Error creating link:", error);
    throw new Error("Unable to create link");
  }
};

/**
 * Update an existing link for the logged-in user.
 * @param userId - ID of the logged-in user.
 * @param linkId - ID of the link to update.
 * @param updateData - Data to update.
 * @returns Promise<Link> - Updated link.
 */

export const updateLink = async (
  userId: string,
  linkId: number,
  updateData: Partial<{
    title: string;
    originalUrl: string;
    shortUrl: string;
    is_public: boolean;
    tags: string[];
  }>
): Promise<Link> => {
  try {
    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link || link.authorId !== userId) {
      throw new Error("Link not found or unauthorized");
    }

    const updatePayload: Partial<Link> = {
      title: updateData.title,
      originalUrl: updateData.originalUrl,
      shortUrl: updateData.shortUrl,
      is_public: updateData.is_public,
    };

    if (updateData.tags) {
      updatePayload.tags = updateData.tags;
    }

    const linkData = await prisma.link.update({
      where: { id: linkId },
      data: updatePayload,
    });

    revalidateTag("links");

    return linkData;
  } catch (error) {
    console.error("Error updating link:", error);
    throw new Error("Unable to update link");
  }
};

/**
 * Delete a link for the logged-in user.
 * @param userId - ID of the logged-in user.
 * @param linkId - ID of the link to delete.
 * @returns Promise<Link> - Deleted link.
 */
export const deleteLink = async (linkId: number): Promise<Link> => {
  try {
    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      throw new Error("Link not found");
    }

    const linkData = await prisma.link.delete({
      where: { id: linkId },
    });

    revalidateTag("links");

    return linkData;
  } catch (error) {
    console.error("Error deleting link:", error);
    throw new Error("Unable to delete link");
  }
};
