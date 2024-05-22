import { Request,Response } from "express";
import { ifMatiereIsForClasse } from "./matiere"
import { createHoraire } from "./horaire";

//CREATE FICHE : CHECK IF MATIERE IS FOR A CLASSE, THEN CREATE HORAIRE
export async function createFiche(req: Request, res: Response){
    const ifMatiereTrue= await ifMatiereIsForClasse(req,res)
    if(ifMatiereTrue){
        await createHoraire(req,res);  
    }
    else res.status(500).json({"error":{"name":"CreateFicheFailed"}});
    
}