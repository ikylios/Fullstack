import diagnosisData from './data/diagnoses.json';

import { Diagnose } from './types';

const diagnoses: Diagnose[] = diagnosisData;

export const getDiagnoses = (): Diagnose[] => {
    return diagnoses 
}