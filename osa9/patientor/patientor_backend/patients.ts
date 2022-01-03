import patientData from './data/patients.json';

import { Patient, PublicPatient } from './types';

const patients: Patient[] = patientData;

export const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients;
};

export const getPatient = (id: string): PublicPatient | undefined => {
    return patients.find(p => p.id === id);
};

export const addPatient = (patient: Patient): Patient => {
    patients.push(patient);
    console.log(patients);
    return patient;
};