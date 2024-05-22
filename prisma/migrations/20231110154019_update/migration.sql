/*
  Warnings:

  - You are about to alter the column `matricule` on the `utilisateur` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "utilisateur" ALTER COLUMN "matricule" SET DATA TYPE VARCHAR(10);
