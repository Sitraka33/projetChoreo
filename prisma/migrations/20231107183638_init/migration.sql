/*
  Warnings:

  - Added the required column `codeens` to the `horaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codemat` to the `horaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "absence" DROP CONSTRAINT "absence_codemat_fkey";

-- AlterTable
ALTER TABLE "horaire" ADD COLUMN     "codeens" VARCHAR(10) NOT NULL,
ADD COLUMN     "codemat" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "horaire" ADD CONSTRAINT "horaire_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "enseignant"("codeens") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "horaire" ADD CONSTRAINT "horaire_codemat_fkey" FOREIGN KEY ("codemat") REFERENCES "matiere"("codemat") ON DELETE NO ACTION ON UPDATE NO ACTION;
