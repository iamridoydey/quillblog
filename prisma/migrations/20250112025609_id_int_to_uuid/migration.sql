/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BlogPostTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BlogTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PostTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserFollow` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "BlogTag" DROP CONSTRAINT "BlogTag_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogTag" DROP CONSTRAINT "BlogTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_blogPostId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followedId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollowsBlog" DROP CONSTRAINT "UserFollowsBlog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollowsBlog" DROP CONSTRAINT "UserFollowsBlog_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Blog_id_seq";

-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "blogId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlogPost_id_seq";

-- AlterTable
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_pkey",
ALTER COLUMN "blogPostId" SET DATA TYPE TEXT,
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogPostTag_pkey" PRIMARY KEY ("blogPostId", "tagId");

-- AlterTable
ALTER TABLE "BlogTag" DROP CONSTRAINT "BlogTag_pkey",
ALTER COLUMN "blogId" SET DATA TYPE TEXT,
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("blogId", "tagId");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ALTER COLUMN "blogPostId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_pkey",
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId", "tagId");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_pkey",
ALTER COLUMN "followerId" SET DATA TYPE TEXT,
ALTER COLUMN "followedId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("followerId", "followedId");

-- AlterTable
ALTER TABLE "UserFollowsBlog" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "blogId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPostTag" ADD CONSTRAINT "BlogPostTag_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPostTag" ADD CONSTRAINT "BlogPostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowsBlog" ADD CONSTRAINT "UserFollowsBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowsBlog" ADD CONSTRAINT "UserFollowsBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
