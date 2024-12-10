/*
  Warnings:

  - Made the column `anneescolaire` on table `Classe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Classe" ALTER COLUMN "anneescolaire" SET NOT NULL;
