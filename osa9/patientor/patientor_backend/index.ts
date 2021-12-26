/* eslint-disable @typescript-eslint/no-unsafe-call */

import express from "express";
import cors from 'cors';

import { getDiagnoses } from './diagnoses';
import { getPatients, addPatient } from './patients';
import { toNewPatient } from './utils';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
    res.send(getPatients());
});

app.post('/api/patients', (req, res) => {
    console.log(req.body)

    try {
        const newPatient = toNewPatient(req.body)
        res.send(addPatient(newPatient));
    } catch (error: unknown) {
        let errorMessage = 'something went fucky. '
        if (error instanceof Error) {
            errorMessage += 'Error:' + error.message
        }
        res.status(400).send(errorMessage);
    }
});


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});