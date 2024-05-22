-- CreateTable
CREATE TABLE "absence" (
    "codeabs" SMALLSERIAL NOT NULL,
    "motifabs" VARCHAR(100),
    "codemat" INTEGER NOT NULL,
    "codehoraire" INTEGER NOT NULL,
    "im" VARCHAR(20) NOT NULL,

    CONSTRAINT "absence_pkey" PRIMARY KEY ("codeabs")
);

-- CreateTable
CREATE TABLE "annee" (
    "codeas" SMALLSERIAL NOT NULL,
    "anneeas" VARCHAR(20) NOT NULL,

    CONSTRAINT "annee_pkey" PRIMARY KEY ("codeas")
);

-- CreateTable
CREATE TABLE "classe" (
    "codeclasse" SERIAL NOT NULL,
    "classe" VARCHAR(50) NOT NULL,

    CONSTRAINT "classe_pkey" PRIMARY KEY ("codeclasse")
);

-- CreateTable
CREATE TABLE "enseignant" (
    "codeens" VARCHAR(10) NOT NULL,
    "nomens" VARCHAR(50) NOT NULL,
    "prenomsens" VARCHAR(50) NOT NULL,

    CONSTRAINT "enseignant_pkey" PRIMARY KEY ("codeens")
);

-- CreateTable
CREATE TABLE "etudiant" (
    "im" VARCHAR(20) NOT NULL,
    "nometd" VARCHAR(50) NOT NULL,
    "prenomsetd" VARCHAR(50) NOT NULL,
    "cinetd" VARCHAR(20),
    "teletd" VARCHAR(10),
    "mailetd" VARCHAR(50),
    "datenaisetd" DATE,
    "codeas" SMALLINT NOT NULL,
    "codeclasse" INTEGER NOT NULL,

    CONSTRAINT "etudiant_pkey" PRIMARY KEY ("im")
);

-- CreateTable
CREATE TABLE "horaire" (
    "codehoraire" SERIAL NOT NULL,
    "dateabs" DATE NOT NULL,
    "heure" TIME(6) NOT NULL,

    CONSTRAINT "horaire_pkey" PRIMARY KEY ("codehoraire")
);

-- CreateTable
CREATE TABLE "matiere" (
    "codemat" SERIAL NOT NULL,
    "matiere" VARCHAR(50) NOT NULL,
    "codeclasse" INTEGER NOT NULL,
    "codeens" VARCHAR(10) NOT NULL,

    CONSTRAINT "matiere_pkey" PRIMARY KEY ("codemat")
);

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_codehoraire_fkey" FOREIGN KEY ("codehoraire") REFERENCES "horaire"("codehoraire") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_codemat_fkey" FOREIGN KEY ("codemat") REFERENCES "matiere"("codemat") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "absence" ADD CONSTRAINT "absence_im_fkey" FOREIGN KEY ("im") REFERENCES "etudiant"("im") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_codeas_fkey" FOREIGN KEY ("codeas") REFERENCES "annee"("codeas") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "etudiant" ADD CONSTRAINT "etudiant_codeclasse_fkey" FOREIGN KEY ("codeclasse") REFERENCES "classe"("codeclasse") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_codeclasse_fkey" FOREIGN KEY ("codeclasse") REFERENCES "classe"("codeclasse") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "matiere" ADD CONSTRAINT "matiere_codeens_fkey" FOREIGN KEY ("codeens") REFERENCES "enseignant"("codeens") ON DELETE NO ACTION ON UPDATE NO ACTION;
