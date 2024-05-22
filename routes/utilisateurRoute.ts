import { Router } from "express";
import { createUtilisateur, deleteUtilisateur, findUtilisateur, readUtilisateur, updateUtilisateur } from "../controllers/utilisateur";

const utilisateurRoute:Router=Router();

utilisateurRoute.post('/utilisateur',createUtilisateur);

utilisateurRoute.put('/utilisateur',updateUtilisateur);

utilisateurRoute.delete('/utilisateur/:matricule',deleteUtilisateur);

utilisateurRoute.get('/utilisateur',readUtilisateur);

utilisateurRoute.post('/authentification',findUtilisateur);

export default utilisateurRoute;