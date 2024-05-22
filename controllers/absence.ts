import prisma from "../connection";
import { Request, Response } from "express";

//CREATE ABSENCE BY A GIVEN LIST
export async function createAbsence(req:Request, res:Response) {
    try{
        const listAbsence=req.body;
        await prisma.absence.createMany({
            data:listAbsence,
            skipDuplicates:true
        })
        res.status(201).json({"message":"created successfully"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//UPDATE MOTIF IN ABSENCE
export async function updateAbsence(req:Request, res:Response) {
    try{
        const listAbsence=req.body;
        for (const absence of listAbsence){
            await prisma.absence.update({
                where:{
                    codeabs:absence.codeabs
                },
                data:{
                    motifabs:absence.motifabs
                }
            })
        }
        
        res.status(200).json({"message":"updated successfully"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//LIST ABSENCE BY A CODEHOAIRE
export async function getByCodehoraire(req:Request,res:Response){
    try{
        const codehoraire=Number(req.params.codehoraire);
        const listAbsence=await prisma.absence.findMany({
            where:{
                codehoraire:codehoraire
            },
            select:{
                codeabs:true,
                motifabs:true,
                etudiant:true
            }
        })
        const resultRenamedFields = listAbsence.map(item => ({
            codeabs: item.codeabs,
            im: item.etudiant.im,
            nometd: item.etudiant.nometd,
            prenomsetd: item.etudiant.prenomsetd,
            motifabs:item.motifabs
          }));

        res.status(200).json(resultRenamedFields)
    }
    catch(error){
        res.status(500).json({error:error});
    }
}