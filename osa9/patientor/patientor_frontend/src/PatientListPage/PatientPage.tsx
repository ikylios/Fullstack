/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "../state";

import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry } from "../types";

import { EntriesList } from './Entries';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import { Table, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

const PatientPage = () => {

  const [, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = useState<Patient>();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios
        .post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch({ type: "ADD_ENTRY", payload: { patient_id: id, entry: newEntry }});
      closeModal();
      void fetchPatient();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };
    
  const fetchPatient = async () => { 
    try {
      void await axios
        .get(`${apiBaseUrl}/patients/${id}`)
        .then(response => setPatient(response.data));
    } catch (e) {
      console.error(e);
    }
  };

    
  useEffect(() => {
    void fetchPatient();
  }, []);

  
  if (!patient) {
      return(
        <div>
           loading... 
        </div>
      );
  }

  const genderToIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case Gender.Female: return 'venus';
      case Gender.Male: return 'mars';
      default: return 'neuter';
    }
  };

  return (
    <div>
      <h2>{patient.name} <Icon name={genderToIcon(patient.gender)} /> </h2>
      <Table>
        <Table.Body>
          <Table.Row >
            <Table.Cell><b>ssn:</b> {patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row >
            <Table.Cell><b>occupation:</b> {patient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <EntriesList entries={patient.entries} /> 
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;