"use server";

import { PrismaClient, Link } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all links for the logged-in user.
 * @param userId - ID of the logged-in user.
 * @returns Promise<Link[]> - List of links.
 */
export const getLinksByUser = async (userId: string): Promise<Link[]> => {
  try {
    return await prisma.link.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching links:", error);
    throw new Error("Unable to fetch links");
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
    tags?: string[];
  }
): Promise<Link> => {
  try {
    return await prisma.link.create({
      data: {
        ...linkData,
        authorId: userId,
      },
    });
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
    addTags: string[];
    removeTags: string[];
  }>
): Promise<Link> => {
  try {
    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link || link.authorId !== userId) {
      throw new Error("Link not found or unauthorized");
    }

    const updatePayload: any = {
      title: updateData.title,
      originalUrl: updateData.originalUrl,
      shortUrl: updateData.shortUrl,
      is_public: updateData.is_public,
    };

    if (updateData.tags) {
      updatePayload.tags = updateData.tags;
    }

    if (updateData.addTags) {
      updatePayload.tags = {
        push: updateData.addTags,
      };
    }

    if (updateData.removeTags) {
      const currentTags = link.tags || [];
      updatePayload.tags = currentTags.filter(
        (tag) => !updateData.removeTags!.includes(tag)
      );
    }

    return await prisma.link.update({
      where: { id: linkId },
      data: updatePayload,
    });
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
export const deleteLink = async (
  userId: string,
  linkId: number
): Promise<Link> => {
  try {
    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link || link.authorId !== userId) {
      throw new Error("Link not found or unauthorized");
    }

    return await prisma.link.delete({
      where: { id: linkId },
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    throw new Error("Unable to delete link");
  }
};
