import React from "react";

import { Entry } from "../types";
import { useStateValue } from "../state";

import { Table, Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

 const healthToColor = (healthRating: number): SemanticCOLORS => {
  switch (healthRating) {
    case 0: return 'green';
    case 1: return 'yellow';
    case 2: return 'orange';
    default: return 'red';
  }
};

const renderAdditionalInfo = (entry: Entry) => {
  switch (entry.type) {
    
    case "HealthCheck":
      return (
        <div>
          <Icon name='doctor' size='big'/>
          <Icon name='heart' color={healthToColor(entry.healthCheckRating)} size='big'/>
        </div>
      );

    case "Hospital":
      return (
        <div>
          <Icon name='hospital' size='big'/> <br></br>
          <b>Discharge:</b> <br></br>
          date: {entry.discharge.date} <br></br>
          criteria: {entry.discharge.criteria}
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div>
          <Icon name='stethoscope' size='big'/> <br></br>
          {entry.specialist}; {entry.employerName}
          {entry.sickLeave ? 
            <b>Sick leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate} </b>
          : '' }
        </div>
      );
      
  
    default:
      break;
  }
};

export const EntriesList = ({ entries }: { entries: Entry[]}) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <h3>Entries</h3>
      <Table>
        <Table.Body>
          {entries.map((e: Entry)  => 
            <Table.Row key={e.id}>
              <Table.Cell>
                <b>{e.date}</b> {renderAdditionalInfo(e)}
              </Table.Cell>
              <Table.Cell>
                {e.description}
              </Table.Cell>
              <Table.Cell>
                {e.diagnosisCodes?.map((d: string) => 
                  <li key={d}> {d} {diagnoses[d].name} </li>
                  )}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};