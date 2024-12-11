/*
  Warnings:

  - You are about to drop the column `professeurId` on the `Classe` table. All the data in the column will be lost.
  - You are about to drop the `Professeur` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[utilisateurid]` on the table `Classe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `utilisateurid` to the `Classe` table without a default value. This is not possible if the table is not empty.
  - Made the column `datenaissance` on table `Eleve` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Classe" DROP CONSTRAINT "Classe_professeurId_fkey";

-- DropIndex
DROP INDEX "Classe_professeurId_key";

-- AlterTable
ALTER TABLE "Classe" DROP COLUMN "professeurId",
ADD COLUMN     "utilisateurid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Eleve" ALTER COLUMN "datenaissance" SET NOT NULL;

-- DropTable
DROP TABLE "Professeur";

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentYear" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "CurrentYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_login_key" ON "Utilisateur"("login");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentYear_year_key" ON "CurrentYear"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Classe_utilisateurid_key" ON "Classe"("utilisateurid");

-- AddForeignKey
ALTER TABLE "Classe" ADD CONSTRAINT "Classe_utilisateurid_fkey" FOREIGN KEY ("utilisateurid") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
