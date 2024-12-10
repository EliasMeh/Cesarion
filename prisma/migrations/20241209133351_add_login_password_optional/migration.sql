/*
  Warnings:

  - You are about to drop the `Administrateur` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[login]` on the table `Professeur` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Professeur" ADD COLUMN     "login" TEXT,
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "Administrateur";

-- CreateIndex
CREATE UNIQUE INDEX "Professeur_login_key" ON "Professeur"("login");
