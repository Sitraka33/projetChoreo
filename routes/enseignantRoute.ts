import { Router } from "express";
import { getAllEnseignant, getAllEnseignantNotIn } from "../controllers/enseignant";

const enseignantRoute:Router=Router();
enseignantRoute.get('/enseignant',getAllEnseignantNotIn);
enseignantRoute.get('/enseignants',getAllEnseignant);

export default enseignantRoute;