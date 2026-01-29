/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sessionId" TEXT;
