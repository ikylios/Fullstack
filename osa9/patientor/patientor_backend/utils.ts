import { v1 as uuid } from 'uuid';
import { Patient } from "./types";

type Fields = { 
    name: unknown, 
    dateOfBirth: unknown, 
    ssn: unknown, 
    gender: unknown, 
    occupation: unknown 
}

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): Patient => {
   const id = uuid();

   const newPatient: Patient = {
        id: id,
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
   } 

   return newPatient
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