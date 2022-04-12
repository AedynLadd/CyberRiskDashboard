import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../Common/QuestionLabel';
const columns = [
    { field: 'NetworkData', headerName: 'Network Data', width: 150 },
    {
      field: 'ip',
      headerName: 'IP Address',
      width: 150,
      editable: true,
    },
    {
      field: 'port',
      headerName: 'PortNumber',
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
    { id:1, NetworkData: "Sender ID", ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:2, NetworkData: "Sender IP", ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:3,NetworkData: 'Sender State', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:4,NetworkData: 'Receiver ID', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:5,NetworkData: 'Receiver IP',ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:6,NetworkData: 'Receiver State', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:7,NetworkData: 'Time', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:8,NetworkData: 'Destination', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:9,NetworkData: 'Port Number', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:10,NetworkData: 'Network Protocol',ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:11,NetworkData: 'Byte Transfer Amount', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
    { id:12,NetworkData: 'Attachement', ip: null, port: null, DatabaseName: null, TableName: null, columnName: null },
];

export default function MYSQLTable({question}) {
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