/*
  Warnings:

  - You are about to drop the column `nomutilisateur` on the `utilisateur` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "utilisateur_nomutilisateur_key";

-- AlterTable
ALTER TABLE "utilisateur" DROP COLUMN "nomutilisateur";
