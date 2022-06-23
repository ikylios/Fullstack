import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
    {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
  }
  | {
      type: "ADD_ENTRY";
      payload: { patient_id: string, entry: Entry }
  }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
  };


export const reducer = (state: State, action: Action): State => {

  console.log(state);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient: Patient = state.patients[action.payload.patient_id];
      const new_entries: Entry[] = [ ...state.patients[action.payload.patient_id].entries, action.payload.entry ];
      patient.entries = new_entries;

//      const entries = state.patients[action.payload.patient_id].entries
//      const entry_as_array: Entry[] = [action.payload.entry]
//      const new_entries = entries.concat(action.payload.entry)

//      const new_patients =

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patient_id]: patient
        }
        /*
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patient_id]: patient 
        }
        */
      };
    default:
      return state;
  }
};
