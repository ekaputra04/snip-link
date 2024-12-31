-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tags" TEXT[];
