import { v1 as uuid } from 'uuid';
import { Patient, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "./types";

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Patient): Patient => {
   const id = uuid();

   const newPatient: Patient = {
        id: id,
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        entries: [],
        occupation: parseString(occupation)
   } 

   return newPatient
}

export const toNewEntry = (props: Entry): Entry => {
    const id = uuid();

    switch (props.type) {
        
        case 'Hospital':
            const HospitalEntry: HospitalEntry = {
                id: id,
                date: props.date,
                description: props.description,
                specialist: props.specialist,
                diagnosisCodes: props.diagnosisCodes,
                type: props.type,
                discharge: props.discharge,
            }
           return HospitalEntry;
        
       case 'OccupationalHealthcare':
            const OccupationalEntry: OccupationalHealthcareEntry = {
                id: id,
                date: props.date,
                description: props.description,
                specialist: props.specialist,
                diagnosisCodes: props.diagnosisCodes,
                type: props.type,
                sickLeave: props.sickLeave,
                employerName: props.employerName
            }
            return OccupationalEntry
        
        case 'HealthCheck':
            const HealthEntry: HealthCheckEntry = {
                id: id,
                date: props.date,
                description: props.description,
                specialist: props.specialist,
                diagnosisCodes: props.diagnosisCodes,
                type: props.type,
                healthCheckRating: props.healthCheckRating
            }
            return HealthEntry
   }
}



const parseString = (input: unknown): string => {
    if (!input || !isString(input)) {
        throw new Error('String was not string:' + input)
    }
    return input
}

const isString = (input: unknown): input is string => {
    return typeof input === 'string' || input instanceof String
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date)
    }
    return date
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseGender = (input: unknown): Gender => {
    if (!input || !isGender(input)) {
        throw new Error('Incorrect or missing gender:' + input)
    }
    return input 
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}