import { Router } from "express";
import { createFiche } from "../controllers/fiche";
import { deleteByCodehoraire, getAllHoraire, getAllHoraireByEns, getBtw2Date, getByDate, getByDateHeureEnsMatiere, getHoraireByMonth } from "../controllers/horaire";

const horaireRoute: Router = Router();

horaireRoute.post('/fiche',createFiche);

horaireRoute.get('/fiche',getAllHoraire);

horaireRoute.get('/fiche/:mm',getHoraireByMonth);

horaireRoute.get('/ficheByEnseignant/:matricule',getAllHoraireByEns);

horaireRoute.post('/ficheByHoraire',getByDateHeureEnsMatiere);

horaireRoute.get('/fiche/:dateSup/:dateInf',getBtw2Date);

horaireRoute.get('/ficheByDate/:dateabs',getByDate);

horaireRoute.delete('/fiche/:codehoraire',deleteByCodehoraire);

export default horaireRoute;