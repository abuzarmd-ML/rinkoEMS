// src/pages/AdminConfigurations.js
import React from 'react';
import { Box, Grid, Typography,Toolbar } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import EmployeeStatus from '../DropdownOptions/EmployeeStatus';
import EmployeeType from '../DropdownOptions/EmployeeType';
import StatusOptions from '../DropdownOptions/StatusOptions';
import CompanyColors from '../DropdownOptions/CompanyColors';

const AdminConfigurations = () => {
  return (
    <AdminLayout title="Admin Configurations">
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
            <Grid container spacing={2} mb={2} mt={2} p={2} sx={{ marginLeft: '10px' }}>
            <Grid item md={4}>
                <EmployeeStatus />
            </Grid>
            <Grid item md={4}>
                <EmployeeType />
            </Grid>
            <Grid item md={4}>
                <StatusOptions />
            </Grid>
            <Grid item md={4}>
                <CompanyColors />
            </Grid>
            
            </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminConfigurations;
