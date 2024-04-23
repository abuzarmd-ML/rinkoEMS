import { Box, Toolbar, Container, Grid, Paper,Typography } from '@mui/material';
import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import AttendanceInput from '../Cards/AttendanceInput';
import ImgMediaCard from '../Cards/ImageMedia';

const Employee = () => {
  return (
        <AdminLayout title="Attendance System">
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
          <ImgMediaCard  />
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <AttendanceInput  />
            </Container>
        </Box>
      </AdminLayout>
  );
};

export default Employee;
