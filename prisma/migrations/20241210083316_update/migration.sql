/*
  Warnings:

  - The primary key for the `Professeur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Professeur` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `professeurId` on the `Classe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Classe" DROP CONSTRAINT "Classe_professeurId_fkey";

-- AlterTable
ALTER TABLE "Classe" DROP COLUMN "professeurId",
ADD COLUMN     "professeurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Professeur" DROP CONSTRAINT "Professeur_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Professeur_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Classe_professeurId_key" ON "Classe"("professeurId");

-- AddForeignKey
ALTER TABLE "Classe" ADD CONSTRAINT "Classe_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "Professeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
