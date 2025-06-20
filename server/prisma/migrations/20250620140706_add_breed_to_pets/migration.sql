/*
  Warnings:

  - You are about to drop the column `type` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "type",
ADD COLUMN     "breed" TEXT;
