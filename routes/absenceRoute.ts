import { Router } from "express";
import { createAbsence, getByCodehoraire, updateAbsence } from "../controllers/absence";

const absenceRoute:Router=Router();

absenceRoute.post('/absence',createAbsence);

absenceRoute.put('/absence',updateAbsence);

absenceRoute.get('/absence/:codehoraire',getByCodehoraire);

export default absenceRoute;