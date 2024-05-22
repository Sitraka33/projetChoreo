import express from 'express';
import swaggerUi from 'swagger-ui-express';
import matiereRoute from './routes/matiereRoute';
import horaireRoute from './routes/horaireRoute';
import etudiantRoute from './routes/etudiantRoute';
import utilisateurRoute from './routes/utilisateurRoute';
import classeRoute from './routes/classeRoute';
import absenceRoute from './routes/absenceRoute';
import enseignantRoute from './routes/enseignantRoute';
import scolariteRoute from './routes/scolariteRoute';


const cors = require("cors");
const swaggerDocument = require("./swagger.json");

const app = express();
const port : Number = 3000;

app.use(express.json())

app.use(cors());

app.use('/',horaireRoute);

app.use('/',matiereRoute);

app.use('/',etudiantRoute);

app.use('/',utilisateurRoute);

app.use('/',classeRoute);

app.use('/',absenceRoute);

app.use('/',enseignantRoute);

app.use('/',scolariteRoute);

app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port,()=>{
    
});

