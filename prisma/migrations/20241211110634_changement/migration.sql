/*
  Warnings:

  - A unique constraint covering the columns `[name,lastname]` on the table `Eleve` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Eleve_name_lastname_key" ON "Eleve"("name", "lastname");
