/*
  Warnings:

  - The primary key for the `utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[matricule]` on the table `utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "utilisateur" DROP CONSTRAINT "utilisateur_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_matricule_key" ON "utilisateur"("matricule");
