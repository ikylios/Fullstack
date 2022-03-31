import entryData from './data/patientsEntries';

import { Entry } from './types';

const patientEntries  = entryData;

export const addEntry = (entry: Entry, id: string): Entry => {
    patientEntries.find(p => p.id === id)?.entries.push(entry)
    return entry;
};