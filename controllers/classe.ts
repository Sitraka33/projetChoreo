import prisma from "../connection";
import { Request, Response } from "express";

//GET ALL CLASSE_NAME
export async function getClasse(req:Request, res:Response) {
    try{
        const classe=await prisma.classe.findMany({
            select:{
                classe:true
            }
        })
        res.status(200).json(classe);
    }
    catch(error){
        res.status(500).json({error:error});
    }
}
