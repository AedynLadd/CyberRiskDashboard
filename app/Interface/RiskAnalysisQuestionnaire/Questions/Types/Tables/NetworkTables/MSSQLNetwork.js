import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../../Common/QuestionLabel';
const columns = [
  { field: 'NetworkData', headerName: 'Network Data', width: 150 },
  {
    field: 'DomainName',
    headerName: 'Domain Name',
    width: 150,
    editable: true,
  },
  {
    field: 'ServerName',
    headerName: 'Server Name',
    width: 150,
    editable: true,
  },
  {
    field: 'DatabaseName',
    headerName: 'Database Name',
    width: 150,
    editable: true,
  },
  {
    field: 'TableName',
    headerName: 'Table Name',
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
  { id:1, NetworkData: "Sender ID", DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:2, NetworkData: "Sender IP", DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:3, NetworkData: 'First Name', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:4, NetworkData: 'Last Name', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:5, NetworkData: 'Username', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:6, NetworkData: 'State', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:7, NetworkData: 'Applications', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:8, NetworkData: 'Email', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:9, NetworkData: 'Department', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:10, NetworkData: 'Phone Number', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:11, NetworkData: 'Location', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
];

export default function MSSQLNetwork({question}) {
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