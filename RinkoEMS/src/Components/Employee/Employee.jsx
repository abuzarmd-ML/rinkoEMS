import { Box, Toolbar, Container, Grid, Paper,Typography } from '@mui/material';
import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';

const columns = [
    {
      accessorKey: 'name.firstName', //access nested data with dot notation
      header: 'First Name',
      size: 150,
    },
    {
      accessorKey: 'name.middleName',
      header: 'Middle Name',
      size: 150,
    },
    {
      accessorKey: 'name.lastName',
      header: 'Last Name',
      size: 150,
    },
    {
      accessorKey: 'obra', //normal accessorKey
      header: 'Obra',
      size: 200,
    },
    {
      accessorKey: 'employeeId',
      header: 'EmployeeId',
      size: 150,
    },
    {
      accessorKey: 'nie',
      header: 'NIE',
      size: 150,
    },
    {
      accessorKey: 'dob',
      header: 'DOB',
      size: 150,
    },
    {
      accessorKey: 'salary',
      header: 'Salary',
      size: 150,
    },
  ]

  const data = [
    {
      name: {
        firstName: 'Farhan',
        middleName: ' ',
        lastName: 'Khan',
      },
      obra: 'Rinko',
      employeeId: '10001',
      nie: 'A12121212',
      dob: '01/01/1995',
      salary:10000
    },
    {
      name: {
        firstName: 'Nasir',
        middleName: ' ',
        lastName: 'Sohail',
      },
      obra: 'Rinko',
      employeeId: '123',
      nie: 'sasasasas',
      dob: '01/01/1990',
      salary:13000
    },
    {
      name: {
        firstName: 'Ihtsham',
        middleName: ' ',
        lastName: 'Zafar',
      },
      obra: 'Rinko',
      employeeId: '150001',
      nie: 'xaxaxaxax',
      dob: '01/01/1989',
      salary:16000
    },
    {
      name: {
        firstName: 'Sheeraz',
        middleName: ' ',
        lastName: 'Akhtar',
      },
      obra: 'Rinko',
      employeeId: '0786',
      nie: 'wewewewew',
      dob: '01/01/1995',
      salary:100
    },
    {
      name: {
        firstName: 'Abdul',
        middleName: ' ',
        lastName: 'Wahid',
      },
      obra: 'Rinko',
      employeeId: '0001',
      nie: 'qaqaqaqaqa',
      dob: '01/01/1995',
      salary:16000
    },
    {
      name: {
        firstName: 'Mor',
        middleName: ' ',
        lastName:   'Ndiya',
      },
      obra: 'Rinko',
      employeeId: '1234',
      nie: 'wtwtwtwtw',
      dob: '01/01/1888',
      salary:106600
    },
    {
      name: {
        firstName: 'Waqas',
        middleName: ' ',
        lastName: 'Sakandar',
      },
      obra: 'Rinko',
      employeeId: '4562',
      nie: 'wdwdwdwdwd',
      dob: '01/01/1995',
      salary:10000
    },
    {
      name: {
        firstName: 'Ghulam',
        middleName: ' ',
        lastName: 'Murtaza',
      },
      obra: 'Rinko',
      employeeId: '7956',
      nie: 'pipipipipip',
      dob: '01/01/1979',
      salary:1022220
    },
    {
      name: {
        firstName: 'Abdur',
        middleName: ' ',
        lastName: 'Razzaq',
      },
      obra: 'Rinko',
      employeeId: '2580',
      nie: 'jfjfjfjfjf',
      dob: '01/01/1980',
      salary:10000000
    },
  ];

  
const Employee = () => {
  return (
        <AdminLayout title="Employee Management">
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

export default Employee;
