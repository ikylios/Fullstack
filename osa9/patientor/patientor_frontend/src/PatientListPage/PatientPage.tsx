/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useEffect, useState } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";

import { EntriesList } from './Entries';

import { Table, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

const PatientPage = () => {

  const { id } = useParams<{id: string}>();
  const [patient, setPatient] = useState<Patient>();
    
  useEffect(() => {
    const fetchPatient = async () => { 
      try {
        void await axios
          .get(`${apiBaseUrl}/patients/${id}`)
          .then(response => setPatient(response.data));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient) {
      void fetchPatient();
    }
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
        <Table.Body>
          <Table.Row >
            <Table.Cell><b>ssn:</b> {patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row >
            <Table.Cell><b>occupation:</b> {patient.occupation}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <h3>Entries</h3>
          </Table.Row>
          <Table.Row>
            <EntriesList entries={patient.entries} />
          </Table.Row>
        </Table.Body>
    </div>
  );
};

export default PatientPage;