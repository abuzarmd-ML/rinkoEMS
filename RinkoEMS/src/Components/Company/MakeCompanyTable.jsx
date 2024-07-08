// MakeCompanyTable.jsx

import React from 'react';
import { Button } from '@mui/material';
import StatusChip from '../BasicForm/StatusChip';
import BasicMuiTable from '../Table/BasicMuiTable';

const MakeCompanyTable = ({ data, handleClickOpen }) => {
  const columns = [
    { accessorKey: 'name', header: 'Company Name', size: 150 },
    { accessorKey: 'phone', header: 'Phone', size: 150 },
    { accessorKey: 'country', header: 'Country', size: 150 },
    { accessorKey: 'nie', header: 'NIE', size: 150 },
    { accessorKey: 'address', header: 'Address', size: 150 },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 150,
      Cell: ({ cell }) => <StatusChip status={cell.getValue()} />,
    },
    { accessorKey: 'city', header: 'City', size: 150 },
    {
      accessorKey: 'color',
      header: 'Company Color',
      size: 150,
      Cell: ({ row }) => (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: row.original.color,
          }}
        ></div>
      ),
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      size: 200,
      Cell: ({ row }) => (
        <>
          <Button href={`/company/add/${row.original.company_id}`} variant="outlined">View</Button>
          <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.company_id)}>Delete</Button>
        </>
      ),
    },
  ];

  return <BasicMuiTable columns={columns} data={data} />;
};

export default MakeCompanyTable;
