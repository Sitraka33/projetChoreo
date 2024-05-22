import prisma from "../connection";
import { Request,Response } from "express";

// GET ALL ETUDIANTS FOR A CLASSE
export async function getEtudiantsByClasse(req: Request, res : Response){
    try{
        const {classe}=req.body;
        const listEtudiants=await prisma.etudiant.findMany({
            where : {
                classe : {
                classe: classe
                }
            },
            select : {
                im:true,
                nometd:true,
                prenomsetd:true
            }
        })
        res.status(200).json(listEtudiants);
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}


