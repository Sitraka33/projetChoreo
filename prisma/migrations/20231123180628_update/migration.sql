/*
  Warnings:

  - A unique constraint covering the columns `[nomutilisateur]` on the table `utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomutilisateur` to the `utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "utilisateur" ADD COLUMN     "nomutilisateur" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_nomutilisateur_key" ON "utilisateur"("nomutilisateur");
