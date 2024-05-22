import prisma from "../connection";
import {Response,Request} from "express";

//GET SCOLARITE BY MATRICULE
export async function getScolariteByMatricule(matricule:string, res:Response) {
    try{
        const scolarite= await prisma.scolarite.findFirstOrThrow({
            where:{
                codesco:matricule
            },
            select:{
                nomsco:true,
                prenomsco:true
            }
        })
        const resultRenamedFields={
            nom:scolarite.nomsco,
            prenoms:scolarite.prenomsco
        }
        return resultRenamedFields;
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}

//GET ALL SCOLARITE
export async function getAllScolarite(req:Request,res:Response) {
    try{
        const listSco=await prisma.$queryRaw`
        SELECT s.codesco, s.nomsco, s.prenomsco
        FROM scolarite s
        LEFT JOIN utilisateur u ON s.codesco = u.matricule
        WHERE u.matricule IS NULL`;
        res.status(200).json(listSco);
    }
    catch(error){
        res.status(500).json({error:error});
    }
}