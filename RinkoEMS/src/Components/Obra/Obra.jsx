import { Box,Toolbar,Container,Grid } from '@mui/material';
import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';

const columns = [
    {
      accessorKey: 'name', //access nested data with dot notation
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'address', //normal accessorKey
      header: 'Address',
      size: 200,
    },
    {
      accessorKey: 'encargar',
      header: 'Encargar',
      size: 150,
    },
  ]

  const data = [
    {
      name: 'port vell',
      address: 'Barcelona',
      encargar: 'Abdul'
    },
    {
        name: 'camp nou',
        address: 'Barcelona',
        encargar: 'Nasir'
      },
      {
        name: 'airport',
        address: 'Madrid',
        encargar: 'Farhan'
      },
      {
        name: 'Amazon',
        address: 'Portugal',
        encargar: 'Sheeraz'
      },
  ];

  
const Obra = () => {
  return (
        <AdminLayout title="Obra Entrada">
             <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
           <Toolbar />
           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid  spacing={2} sx={{m:"1px"}} >
      {/* Add your content for the Employee dashboard here */}
      <BasicMuiTable columns={columns} data={data} />
      </Grid>
      </Container>
      </Box>
      </AdminLayout>
  );
};

export default Obra;
