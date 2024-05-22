import { Prisma } from "@prisma/client";
import prisma from "../connection";
import { Request,Response } from "express";

//GET CODEMAT WHERE MATIERE = MATIERE
export async function getCodemat (req: Request, res: Response){
    try{
        const {matiere} = req.body;
        const matiereResult = await prisma.matiere.findMany(
            {
                where:{
                    matiere:matiere
                },
                select:{
                    codemat:true
                }
            })
        
        return matiereResult[0].codemat;
    }
    catch(error){
        return 0;
    }
}

//GET ALL MATIERES FOR ONE ENSEIGNANT
export async function getMatieresForEns(req: Request, res: Response){
    const codeens=req.params.codeens;
    try{
        const matieres=await prisma.matiere.findMany({
            where:{
                codeens:codeens
            },
            select:{
                codemat:true,
                matiere:true,
                classe:true
            }
        })
        const resultRenamedFields = matieres.map((item: { codemat: any; matiere: any; classe: { classe: any; }; }) => ({
            codemat: item.codemat,
            matiere: item.matiere,
            classe: item.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}

//CHECK IF MATIERE IS FOR A CLASSE
export async function ifMatiereIsForClasse(req: Request, res : Response){
    try{
        const {matiere,classe}=req.body;
        const matiereResult=await prisma.matiere.findMany({
            where:{
                matiere:matiere,
                classe:{
                    classe:classe
                }
            }
        })
        if(matiereResult.length===0){
            return false;
        }
        else return true;
    }
    catch(error){
        return false;
    }
    
}

//CHECK IF MATIERE IS FOR A CLASSE
export async function getAllMatiere(req: Request, res : Response){
    try{
        const listMatiere=await prisma.matiere.findMany();
        res.status(200).json(listMatiere);
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}