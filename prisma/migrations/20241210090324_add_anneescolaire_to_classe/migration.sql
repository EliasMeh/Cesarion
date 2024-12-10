/*
  Warnings:

  - Added the required column `anneescolaire` to the `Classe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classe" ADD COLUMN "anneescolaire" INTEGER DEFAULT 2023;

-- Remove the default value constraint if not needed
ALTER TABLE "Classe" ALTER COLUMN "anneescolaire" DROP DEFAULT;
