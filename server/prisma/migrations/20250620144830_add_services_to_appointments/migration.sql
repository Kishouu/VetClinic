/*
  Warnings:

  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `notes` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "serviceId" INTEGER NOT NULL,
ALTER COLUMN "notes" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
