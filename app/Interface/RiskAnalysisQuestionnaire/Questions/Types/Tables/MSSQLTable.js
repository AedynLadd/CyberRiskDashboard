import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../Common/QuestionLabel';
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
  { id:3, NetworkData: 'Sender State', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:4, NetworkData: 'Receiver ID', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:5, NetworkData: 'Receiver IP', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:6, NetworkData: 'Receiver State', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:7, NetworkData: 'Time', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:8, NetworkData: 'Destination', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:9, NetworkData: 'Port Number', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:10, NetworkData: 'Network Protocol', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:11, NetworkData: 'Byte Transfer Amount', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
  { id:12, NetworkData: 'Attachement', DomainName: null, ServerName: null, DatabaseName: null, TableName: null, columnName: null },
];

export default function MSSQLTable({question}) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}> 
        <QuestionLabel question={question} />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}