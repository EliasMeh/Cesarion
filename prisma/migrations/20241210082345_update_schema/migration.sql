/*
  Warnings:

  - Made the column `classeId` on table `Eleve` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Eleve" ADD COLUMN     "datenaissance" TIMESTAMP(3),
ALTER COLUMN "classeId" SET NOT NULL;
