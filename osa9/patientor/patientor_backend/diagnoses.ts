import diagnosisData from './data/diagnoses.json';

import { Diagnosis } from './types';

const diagnoses: Diagnosis[] = diagnosisData;

export const getDiagnoses = (): Diagnosis[] => {
    return diagnoses 
}