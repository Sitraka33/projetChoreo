-- DropForeignKey
ALTER TABLE "horaire" DROP CONSTRAINT "horaire_codeens_fkey";

-- AlterTable
ALTER TABLE "horaire" ALTER COLUMN "codeens" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "horaire" ADD CONSTRAINT "horaire_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "enseignant"("codeens") ON DELETE NO ACTION ON UPDATE NO ACTION;
