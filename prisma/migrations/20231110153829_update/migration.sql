/*
  Warnings:

  - The `poste` column on the `utilisateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Poste" AS ENUM ('ADMIN', 'ENSEIGNANT', 'SCOLARITE');

-- AlterTable
ALTER TABLE "utilisateur" DROP COLUMN "poste",
ADD COLUMN     "poste" "Poste" NOT NULL DEFAULT 'ENSEIGNANT';
