import React from "react";

import { Entry } from "../types";
import { useStateValue } from "../state";

import { Table } from "semantic-ui-react";

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
                <b>{e.date}</b>
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