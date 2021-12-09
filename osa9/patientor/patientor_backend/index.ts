import express from "express";
import cors from 'cors';

import { getDiagnoses } from './diagnoses';
import { getPatients } from './patients';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
//    res.send('aa');
});

app.get('/api/patients', (_req, res) => {
    res.send(getPatients());
});


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});