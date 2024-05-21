import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar,Container, Paper } from '@mui/material';
import AddCompany from './AddCompany';

const Company = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <AdminLayout title="Company">
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
        {/* <EmployeeFormContext  > */}
         <Toolbar />
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper>
             <AddCompany />
            </Paper>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default Company;
