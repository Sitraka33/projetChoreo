import { Router } from "express";
import { getAllMatiere, getMatieresForEns} from "../controllers/matiere";

const matiereRoute: Router = Router();

matiereRoute.get('/matiere/:codeens',getMatieresForEns);
matiereRoute.get('/matiere',getAllMatiere);

export default matiereRoute;