"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import { v1 as uuid } from 'uuid';
const diagnoses_1 = require("./diagnoses");
const patients_1 = require("./patients");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.get('/api/diagnoses', (_req, res) => {
    res.send((0, diagnoses_1.getDiagnoses)());
    //    res.send('aa');
});
app.get('/api/patients', (_req, res) => {
    res.send((0, patients_1.getPatients)());
});
/*
app.post('/api/patients', (req, res) => {
    const id = uuid()
    res.send(());
});
*/
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
