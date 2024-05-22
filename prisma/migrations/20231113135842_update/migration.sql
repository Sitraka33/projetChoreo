/*
  Warnings:

  - The values [ADMIN,ENSEIGNANT,SCOLARITE] on the enum `Poste` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Poste_new" AS ENUM ('Admin', 'Enseignant', 'Scolarite');
ALTER TABLE "utilisateur" ALTER COLUMN "poste" DROP DEFAULT;
ALTER TABLE "utilisateur" ALTER COLUMN "poste" TYPE "Poste_new" USING ("poste"::text::"Poste_new");
ALTER TYPE "Poste" RENAME TO "Poste_old";
ALTER TYPE "Poste_new" RENAME TO "Poste";
DROP TYPE "Poste_old";
ALTER TABLE "utilisateur" ALTER COLUMN "poste" SET DEFAULT 'Enseignant';
COMMIT;

-- AlterTable
ALTER TABLE "utilisateur" ALTER COLUMN "motdepasse" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "poste" SET DEFAULT 'Enseignant';
