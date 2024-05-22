import { Router } from "express";
import {getEtudiantsByClasse} from '../controllers/etudiant';

const etudiantRoute:Router=Router();

etudiantRoute.post('/etudiant',getEtudiantsByClasse);

export default etudiantRoute;