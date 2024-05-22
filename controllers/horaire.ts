import prisma from "../connection";
import { Request,Response } from "express";
import { getCodemat } from "./matiere";

//CREATE HORAIRE
export async function createHoraire (req: Request, res : Response){
    try{
        const codemat= await getCodemat(req,res);    
        const {dateabs,heure,codeens}=req.body;
        let [d,m,y]=dateabs.split('-').map((str: string) => parseInt(str, 10))
        let [h,min]=heure.split(':').map((str: string) => parseInt(str, 10))
        const date =new Date(Date.UTC(y,m-1,d,h,min,0,0));
        const horaire=await prisma.horaire.create({
            data:{
                dateabs:date,
                heure:date,
                codeens:codeens,
                codemat:codemat
            }
            
        })
        res.status(201).json(horaire);
    }
    catch(error){
        res.status(500).json({"error":error});
    } 
    
}

//GET ALL HORAIRE BY MONTH
export async function getHoraireByMonth(req: Request, res : Response) {
    const mm=Number(req.params.mm);
    try{
        const listHoraire= await prisma.$queryRaw`
        SELECT 
            h.codehoraire, TO_CHAR(dateabs, 'DD-MM-YYYY')as dateabs, TO_CHAR(heure, 'HH24:MI') as heure,
            e.nomens,
            m.matiere,
            c.classe
        FROM horaire h
        JOIN
        enseignant e ON h.codeens = e.codeens
        JOIN
        matiere m ON h.codemat = m.codemat
        JOIN
        classe c ON m.codeclasse=c.codeclasse
        WHERE 
            EXTRACT(MONTH FROM dateabs)=${mm}
        ORDER BY dateabs DESC`;   
        res.status(200).json(listHoraire);
    }
    catch(error){
        res.status(500).json({"error":error});
    } 
    
}

//GET BY DATE HEURE ENS MATIERE
export async function getByDateHeureEnsMatiere(req: Request, res : Response) {
    const {dateabs,heure,enseignant,matiere}=req.body;
    try{
        let [d,m,y]=dateabs.split('-').map((str: string) => parseInt(str, 10))
        let [h,min]=heure.split(':').map((str: string) => parseInt(str, 10))
        const date =new Date(Date.UTC(y,m-1,d,h,min,0,0));
        const listHoraire=await prisma.horaire.findMany({
            where:{
                dateabs:date,
                heure:date,
                enseignant:{
                    nomens:enseignant
                },
                matiere:{
                    matiere:matiere
                }
            },
            select:{
                codehoraire:true,
                dateabs:true,
                heure:true,
                enseignant:{
                    select:{
                        nomens:true
                    }
                },
                matiere:{
                    select:{
                        matiere:true,
                        classe:true
                    }
                }
                
            }
        })
        const resultRenamedFields = listHoraire.map(item => ({
            codehoraire: item.codehoraire,
            dateabs: dateabs,
            heure: heure,
            nomens: item.enseignant.nomens,
            matiere:item.matiere.matiere,
            classe:item.matiere.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}

//GET BTW 2 DATE
export async function getBtw2Date(req:Request,res:Response){  
    try{
        const [d1,m1,y1]=req.params.dateSup.split('-').map((str: string) => parseInt(str, 10));
        const dateSup=new Date(Date.UTC(y1,m1-1,d1+1,0,0,0,0));
        const [d2,m2,y2]=req.params.dateInf.split('-').map((str: string) => parseInt(str, 10));
        const dateInf=new Date(Date.UTC(y2,m2-1,d2-1,0,0,0,0));
        const listHoraire=await prisma.horaire.findMany({
            where:{
                dateabs:{
                    gt:dateInf,
                    lt:dateSup
                }
            },
            select:{
                codehoraire:true,
                dateabs:true,
                heure:true,
                enseignant:{
                    select:{
                        nomens:true
                    }
                },
                matiere:{
                    select:{
                        matiere:true,
                        classe:true
                    }
                }
                
            },
            orderBy:{
                dateabs:'desc'
            }
        })
        const resultRenamedFields = listHoraire.map(item => ({
            codehoraire: item.codehoraire,
            dateabs: parseDate(item.dateabs),
            heure: parseHour(item.heure),
            nomens: item.enseignant.nomens,
            matiere:item.matiere.matiere,
            classe:item.matiere.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}

//PARSE DATE TO DD-MM-YYYY
function parseDate(date:Date){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()+1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

//PARSE HOUR TO HH:MM
function parseHour(date:Date){
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const formattedHour = `${hh}:${min}`;
    return formattedHour;
}

//GET FICHE BY A DATE
export async function getByDate(req:Request,res:Response){
    try{
        const [d,m,y]=req.params.dateabs.split('-').map((str: string) => parseInt(str, 10));
        const dateabs=new Date(Date.UTC(y,m-1,d,0,0,0,0));
        const listHoraire=await prisma.horaire.findMany({
            where:{
                dateabs:dateabs
            },
            select:{
                codehoraire:true,
                dateabs:true,
                heure:true,
                enseignant:{
                    select:{
                        nomens:true
                    }
                },
                matiere:{
                    select:{
                        matiere:true,
                        classe:true
                    }
                }
                
            },
            orderBy:{
                heure:'asc'
            }
        })
        const resultRenamedFields = listHoraire.map(item => ({
            codehoraire: item.codehoraire,
            dateabs: dateabs,
            heure: parseHour(item.heure),
            nomens: item.enseignant.nomens,
            matiere:item.matiere.matiere,
            classe:item.matiere.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}

// GET ALL HORAIRES
export async function getAllHoraire(req: Request, res : Response) {
    try{
        const listHoraire=await prisma.horaire.findMany({
            select:{
                codehoraire:true,
                dateabs:true,
                heure:true,
                enseignant:{
                    select:{
                        nomens:true
                    }
                },
                matiere:{
                    select:{
                        matiere:true,
                        classe:true
                    }
                }
                
            },
            orderBy:{
                dateabs:'desc'
            }
        })
        const resultRenamedFields = listHoraire.map(item => ({
            codehoraire: item.codehoraire,
            dateabs: parseDate(item.dateabs),
            heure: parseHour(item.heure),
            nomens: item.enseignant.nomens,
            matiere:item.matiere.matiere,
            classe:item.matiere.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}

// GET ALL HORAIRES
export async function getAllHoraireByEns(req: Request, res : Response) {
    const matricule=req.params.matricule;
    try{
        const listHoraire=await prisma.horaire.findMany({
            where:{
                codeens:matricule
            },
            select:{
                codehoraire:true,
                dateabs:true,
                heure:true,
                enseignant:{
                    select:{
                        nomens:true
                    }
                },
                matiere:{
                    select:{
                        matiere:true,
                        classe:true
                    }
                }
                
            },
            orderBy:{
                dateabs:'desc'
            }
        })
        const resultRenamedFields = listHoraire.map(item => ({
            codehoraire: item.codehoraire,
            dateabs: parseDate(item.dateabs),
            heure: parseHour(item.heure),
            nomens: item.enseignant.nomens,
            matiere:item.matiere.matiere,
            classe:item.matiere.classe.classe
          }));
        res.status(200).json(resultRenamedFields);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}

//DELETE HORAIRE
export async function deleteByCodehoraire(req:Request,res:Response){
    const codehoraire=parseInt(req.params.codehoraire);
    try{
        const horaire=await prisma.horaire.delete({
            where:{
                codehoraire:codehoraire
            }
        })
        res.status(200).json(horaire);
    }
    catch(error){
        res.status(500).json({"error":error});
    }
}