import { Router } from "express";
import { getClasse } from "../controllers/classe";

const classeRoute:Router=Router();

classeRoute.get('/classe',getClasse);

export default classeRoute;