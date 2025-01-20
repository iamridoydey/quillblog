/*
  Warnings:

  - You are about to drop the column `blogPostId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `blogPostId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogPostTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId,blogArticleId,commentId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_blogPostId_fkey";

-- DropIndex
DROP INDEX "Like_userId_postId_blogPostId_commentId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "blogPostId",
ADD COLUMN     "blogArticleId" TEXT;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "blogPostId",
ADD COLUMN     "blogArticleId" TEXT;

-- DropTable
DROP TABLE "BlogPost";

-- DropTable
DROP TABLE "BlogPostTag";

-- CreateTable
CREATE TABLE "BlogArticle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT,
    "content" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogArticleTag" (
    "blogArticleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "BlogArticleTag_pkey" PRIMARY KEY ("blogArticleId","tagId")
);

-- CreateIndex
CREATE INDEX "BlogArticle_userId_idx" ON "BlogArticle"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_postId_blogArticleId_commentId_key" ON "Like"("userId", "postId", "blogArticleId", "commentId");

-- AddForeignKey
ALTER TABLE "BlogArticle" ADD CONSTRAINT "BlogArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticle" ADD CONSTRAINT "BlogArticle_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogArticleId_fkey" FOREIGN KEY ("blogArticleId") REFERENCES "BlogArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleTag" ADD CONSTRAINT "BlogArticleTag_blogArticleId_fkey" FOREIGN KEY ("blogArticleId") REFERENCES "BlogArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleTag" ADD CONSTRAINT "BlogArticleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogArticleId_fkey" FOREIGN KEY ("blogArticleId") REFERENCES "BlogArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
