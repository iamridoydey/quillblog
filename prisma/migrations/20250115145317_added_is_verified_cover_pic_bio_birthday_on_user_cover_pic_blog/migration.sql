-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "coverPic" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdate" TEXT,
ADD COLUMN     "coverPic" TEXT,
ADD COLUMN     "isVerfied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT;
