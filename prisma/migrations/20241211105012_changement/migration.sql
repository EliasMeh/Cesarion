/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN "email" TEXT DEFAULT 'default@example.com';
ALTER TABLE "Utilisateur" ALTER COLUMN "email" DROP DEFAULT;
-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");
