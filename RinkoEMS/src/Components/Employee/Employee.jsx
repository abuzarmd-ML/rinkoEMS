import { Box,Toolbar,Container,Grid } from '@mui/material';
import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
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
      {/* <h1>Employee Dashboard</h1> */}
      <Grid  spacing={2} sx={{m:"1px"}} >
      {/* Add your content for the Employee dashboard here */}
      <BasicMuiTable  />
      </Grid>
      </Container>
      </Box>
      </AdminLayout>
  );
};

export default Employee;
