/*
  Warnings:

  - You are about to drop the column `birthdate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthdate",
ADD COLUMN     "birthDate" TIMESTAMP(3);
