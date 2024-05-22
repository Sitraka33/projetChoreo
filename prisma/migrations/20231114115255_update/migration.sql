/*
  Warnings:

  - You are about to drop the column `nomens` on the `scolarite` table. All the data in the column will be lost.
  - You are about to drop the column `prenomsens` on the `scolarite` table. All the data in the column will be lost.
  - Added the required column `nomsco` to the `scolarite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenomsco` to the `scolarite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scolarite" DROP COLUMN "nomens",
DROP COLUMN "prenomsens",
ADD COLUMN     "nomsco" VARCHAR(50) NOT NULL,
ADD COLUMN     "prenomsco" VARCHAR(50) NOT NULL;
