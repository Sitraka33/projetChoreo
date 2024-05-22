import prisma from "../connection";
import {Response,Request} from "express";

//GET ENSEIGNANT BY MATRICULE
export async function getEnseignantByMatricule(matricule:string, res:Response) {
    try{
        const enseignant= await prisma.enseignant.findFirstOrThrow({
            where:{
                codeens:matricule
            },
            select:{
                nomens:true,
                prenomsens:true
            }
        })
        const resultRenamedFields={
            nom:enseignant.nomens,
            prenoms:enseignant.prenomsens
        }
        return resultRenamedFields;
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}

//GET ALL ENSEIGNANT NOT IN UTILISATEUR
export async function getAllEnseignantNotIn(req:Request,res:Response) {        
    try{
        const listEns=await prisma.$queryRaw`
        SELECT e.codeens, e.nomens, e.prenomsens
        FROM enseignant e
        LEFT JOIN utilisateur u ON e.codeens = u.matricule
        WHERE u.matricule IS NULL`;
        res.status(200).json(listEns);
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//GET ALL ENSEIGNANT
export async function getAllEnseignant(req:Request,res:Response) {
    try{
        const listEns=await prisma.enseignant.findMany()
        res.status(200).json(listEns);
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}