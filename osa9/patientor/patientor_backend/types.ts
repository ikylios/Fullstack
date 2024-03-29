export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string
    gender: string, 
    occupation: string,
    entries: Entry[]
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface DischargeDescription {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    description: string;
    discharge: DischargeDescription;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    description: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type PublicPatient = Omit<Patient, 'ssn'>