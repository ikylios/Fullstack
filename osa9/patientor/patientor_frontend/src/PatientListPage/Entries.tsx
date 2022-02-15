import React from "react";

import { Entry } from "../types";

import { Table } from "semantic-ui-react";

export const EntriesList = ({ entries }: { entries: Entry[]}) => {

  return (
    <div>
      {entries.map(e => 
        <Table.Body key={e.id}>
          <Table.Row>
          <b>{e.date}</b> | <i>{e.description}</i>
          </Table.Row>
          <Table.Row>
            {e.diagnosisCodes?.map(d => 
              <li key={d}> {d} </li>
            )}
          </Table.Row>
        </Table.Body>
      )}
    </div>
  );
};