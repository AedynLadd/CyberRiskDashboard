import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../../Common/QuestionLabel';

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
  { id: 1, NetworkData: "Sender ID", filePath: null, columnName: null },
  { id: 2, NetworkData: "Sender IP", filePath: null, columnName: null },
  { id: 3,NetworkData: 'First Name', filePath: null, columnName: null },
  { id: 4,NetworkData: 'Last Name', filePath: null, columnName: null },
  { id: 5,NetworkData: 'Username', filePath: null, columnName: null },
  { id: 6,NetworkData: 'State', filePath: null, columnName: null },
  { id: 7,NetworkData: 'Applications', filePath: null, columnName: null },
  { id: 8,NetworkData: 'Email', filePath: null, columnName: null },
  { id: 9, NetworkData: 'Department', filePath: null, columnName: null },
  { id: 10, NetworkData: 'Phone Number', filePath: null, columnName: null },
  { id: 11, NetworkData: 'Location', filePath: null, columnName: null },
];

export default function CSVNetwork({question}) {
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