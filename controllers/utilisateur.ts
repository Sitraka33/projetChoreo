import prisma from "../connection";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import {getScolariteByMatricule} from "./scolarite";
import { getEnseignantByMatricule } from "./enseignant";

//CREATE UTILISATEUR
export async function createUtilisateur(req:Request, res:Response) {
    try{
        const {matricule,motdepasse,poste}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashPwd=await bcrypt.hash(motdepasse,salt);
        const utilisateur= await prisma.utilisateur.create({
            data:{
                matricule:matricule,
                motdepasse:hashPwd,
                poste:poste       
            }
        })
        res.status(201).json(utilisateur);
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//UPDATE UTILISATEUR
export async function updateUtilisateur(req:Request, res:Response) {
    try{
        const {matricule,motdepasse}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashPwd=await bcrypt.hash(motdepasse,salt);
        const utilisateur=await prisma.utilisateur.update({
            where:{matricule:matricule},
            data:{
                motdepasse:hashPwd
            }
        })
        res.status(200).json(utilisateur);
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//DELETE UTILISATEUR BY MATRICULE
export async function deleteUtilisateur(req:Request, res:Response) {
    try{
        const matricule=req.params.matricule;
        const utilisateur=await prisma.utilisateur.delete({
            //where: {id:parseInt(id)},
            where:{matricule:matricule},
            select:{
                matricule:true
            }
        })
        res.status(200).json(utilisateur);
    }
    catch(error){
        res.status(500).json({error:error});
    }
    
}

//READ ALL UTILISATEUR
export async function readUtilisateur(req:Request, res:Response) {
    try{
        const enseignant: any[]=await prisma.$queryRaw`
            SELECT u.id, u.matricule, u.poste, 
            e.nomens as nom, e.prenomsens as prenoms
            FROM utilisateur u
            JOIN enseignant e ON u.matricule=e.codeens`;
    
        const scolarite: any[]=await prisma.$queryRaw`
            SELECT u.id, u.matricule, u.poste, 
            s.nomsco as nom, s.prenomsco as prenoms
            FROM utilisateur u
            JOIN scolarite s ON u.matricule=s.codesco`;

    
        res.status(200).json(enseignant.concat(scolarite));
        
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//LOG IN WITH nonutilisateur AND motdepasse
export async function findUtilisateur(req:Request,res:Response) {
    try{
        const {matricule,motdepasse}=req.body;
        const utilisateur=await prisma.utilisateur.findUnique({
            where:{
                matricule:matricule
            }
        })
        if(utilisateur!=null){
            const passwordMatch = await bcrypt.compare(motdepasse, utilisateur.motdepasse);
            if(passwordMatch){
                if(utilisateur.poste=='Enseignant'){
                    const enseignant= await getEnseignantByMatricule(matricule,res);
                    const result=Object.assign({},utilisateur,enseignant)
                    res.status(200).json(result);
                }
                if(utilisateur.poste=='Scolarite'){
                    const scolarite=await getScolariteByMatricule(matricule,res);
                    const result=Object.assign({},utilisateur,scolarite);
                    res.status(200).json(result);
                }
                if(utilisateur.poste=='Admin'){
                    res.status(200).json(utilisateur);
                }
            }
            else res.status(500).json({"error":{"name":"passwordError"}})
        }
        else{
            res.status(500).json({"error":{"name":"noUserFound"}});
        }
    }
    catch(error){
        res.status(500).json({error:error});
    }
}

//READ PWD BY MATRICULE
export async function getMdpByMatricule(req:Request,res:Response) {

}