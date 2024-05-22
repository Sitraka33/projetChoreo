import { Router } from "express";
import { getAllScolarite } from "../controllers/scolarite";

const scolariteRoute:Router=Router();

scolariteRoute.get('/scolarite',getAllScolarite);

export default scolariteRoute;