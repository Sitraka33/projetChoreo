-- DropForeignKey
ALTER TABLE "absence" DROP CONSTRAINT "absence_codehoraire_fkey";

-- DropForeignKey
ALTER TABLE "absence" DROP CONSTRAINT "absence_im_fkey";

-- DropForeignKey
ALTER TABLE "enseignant" DROP CONSTRAINT "enseignant_codeens_fkey";

-- DropForeignKey
ALTER TABLE "etudiant" DROP CONSTRAINT "etudiant_codeas_fkey";

-- DropForeignKey
ALTER TABLE "etudiant" DROP CONSTRAINT "etudiant_codeclasse_fkey";

-- DropForeignKey
ALTER TABLE "horaire" DROP CONSTRAINT "horaire_codeens_fkey";

-- DropForeignKey
ALTER TABLE "horaire" DROP CONSTRAINT "horaire_codemat_fkey";

-- DropForeignKey
ALTER TABLE "matiere" DROP CONSTRAINT "matiere_codeclasse_fkey";

-- DropForeignKey
ALTER TABLE "matiere" DROP CONSTRAINT "matiere_codeens_fkey";

-- DropForeignKey
ALTER TABLE "scolarite" DROP CONSTRAINT "scolarite_codesco_fkey";

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_codehoraire_fkey" FOREIGN KEY ("codehoraire") REFERENCES "horaire"("codehoraire") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_im_fkey" FOREIGN KEY ("im") REFERENCES "etudiant"("im") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_codeas_fkey" FOREIGN KEY ("codeas") REFERENCES "annee"("codeas") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_codeclasse_fkey" FOREIGN KEY ("codeclasse") REFERENCES "classe"("codeclasse") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horaire" ADD CONSTRAINT "horaire_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "enseignant"("codeens") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horaire" ADD CONSTRAINT "horaire_codemat_fkey" FOREIGN KEY ("codemat") REFERENCES "matiere"("codemat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_codeclasse_fkey" FOREIGN KEY ("codeclasse") REFERENCES "classe"("codeclasse") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "enseignant"("codeens") ON DELETE CASCADE ON UPDATE CASCADE;
