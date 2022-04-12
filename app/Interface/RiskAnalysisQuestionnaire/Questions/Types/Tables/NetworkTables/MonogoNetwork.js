import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import QuestionLabel from '../../../Common/QuestionLabel';

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
      field: 'CollectionName',
      headerName: 'Collection Name',
      width: 150,
      editable: true,
    },
    {
      field: 'FieldName',
      headerName: 'Field Name',
      width: 150,
      editable: true,
    }
];

const rows = [
    { id:1, NetworkData: "Sender ID", ip: null, port: null, DatabaseName: null, CollectionName: null, FieldName: null },
    { id:2, NetworkData: "Sender IP", ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:3, NetworkData: 'First Name', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:4, NetworkData: 'Last Name', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:5, NetworkData: 'Username',ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:6, NetworkData: 'State', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:7, NetworkData: 'Applications', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:8, NetworkData: 'Email', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:9, NetworkData: 'Department', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:10, NetworkData: 'Phone Number',ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
    { id:11, NetworkData: 'Location', ip: null, port: null, DatabaseName: null,  CollectionName: null, FieldName: null },
];

export default function MonogoNetwork({question}) {
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