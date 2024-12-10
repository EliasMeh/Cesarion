/*
  Warnings:

  - The primary key for the `Classe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Classe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `classeId` on the `Eleve` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Eleve" DROP CONSTRAINT "Eleve_classeId_fkey";

-- AlterTable
ALTER TABLE "Classe" DROP CONSTRAINT "Classe_pkey",
DROP COLUMN "id",
ADD COLUMN "id" SERIAL NOT NULL,
ADD CONSTRAINT "Classe_pkey" PRIMARY KEY ("id");

-- Add a new column with the correct type
ALTER TABLE "Eleve" ADD COLUMN "new_classeId" INTEGER;

-- Copy the data from the old column to the new column
UPDATE "Eleve" SET "new_classeId" = CAST("classeId" AS INTEGER);

-- Drop the old column
ALTER TABLE "Eleve" DROP COLUMN "classeId";

-- Rename the new column to the old column name
ALTER TABLE "Eleve" RENAME COLUMN "new_classeId" TO "classeId";

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
