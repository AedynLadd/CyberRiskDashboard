import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../Common/QuestionLabel';
import Tooltip from '@mui/material/Tooltip'

const columns = [
  { field: 'NetworkData', headerName: 'Network Data', width: 150 },
  {
    field: 'filePath',
    headerName: 'File Path',
    width: 150,
    editable: true,
  },
  {
    field: 'columnName',
    headerName: 'Column Name',
    width: 150,
    editable: true,
  }
];

const rows = [
  { id: 1, NetworkData: "Sender ID", description: 'User01', filePath: null, columnName: null, },
  { id: 2, NetworkData: "Sender IP", filePath: null, columnName: null },
  { id: 3,NetworkData: 'Sender State', filePath: null, columnName: null },
  { id: 4,NetworkData: 'Receiver ID', filePath: null, columnName: null },
  { id: 5,NetworkData: 'Receiver IP', filePath: null, columnName: null },
  { id: 6,NetworkData: 'Receiver State', filePath: null, columnName: null },
  { id: 7,NetworkData: 'Time', filePath: null, columnName: null },
  { id: 8,NetworkData: 'Destination', filePath: null, columnName: null },
  { id: 9, NetworkData: 'Port Number', filePath: null, columnName: null },
  { id: 10, NetworkData: 'Network Protocol', filePath: null, columnName: null },
  { id: 11, NetworkData: 'Byte Transfer Amount', filePath: null, columnName: null },
  { id: 12, NetworkData: 'Attachement', filePath: null, columnName: null },
];

export default function CSVTable({question}) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}> 
        <QuestionLabel question={question} />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}