/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import cors from 'cors';
import { v1 as uuid } from 'uuid';

import { getDiagnoses } from './diagnoses';
import { getPatients, addPatient } from './patients';
import { Patient } from "./types";

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
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const id = uuid();
        
    const newPatient: Omit<Patient, 'id'> = addPatient(
        {
            id,
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        }
    );

    res.send(newPatient);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});