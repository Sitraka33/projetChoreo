-- CreateTable
CREATE TABLE "utilisateur" (
    "matricule" TEXT NOT NULL,
    "nomutilisateur" VARCHAR(50) NOT NULL,
    "motdepasse" VARCHAR(50) NOT NULL,
    "poste" VARCHAR(20) NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("matricule")
);

-- CreateTable
CREATE TABLE "scolarite" (
    "codesco" VARCHAR(10) NOT NULL,
    "nomens" VARCHAR(50) NOT NULL,
    "prenomsens" VARCHAR(50) NOT NULL,

    CONSTRAINT "scolarite_pkey" PRIMARY KEY ("codesco")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_nomutilisateur_key" ON "utilisateur"("nomutilisateur");

-- AddForeignKey
ALTER TABLE "enseignant" ADD CONSTRAINT "enseignant_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "utilisateur"("matricule") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scolarite" ADD CONSTRAINT "scolarite_codesco_fkey" FOREIGN KEY ("codesco") REFERENCES "utilisateur"("matricule") ON DELETE NO ACTION ON UPDATE NO ACTION;
