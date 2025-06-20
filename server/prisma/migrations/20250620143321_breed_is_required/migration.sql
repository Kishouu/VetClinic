/*
  Warnings:

  - Made the column `breed` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "breed" SET NOT NULL;
