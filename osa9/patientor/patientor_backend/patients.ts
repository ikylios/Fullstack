import patientData from './data/patients.json';

import { Patient } from './types';

const patients: Patient[] = patientData;

export const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients
}
