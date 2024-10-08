import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicDetails from '../CompanyForm/BasicDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar, Container } from '@mui/material';
import CompanyFormContext from './CompanyFormContext';

const AddCompany = () => {
  const [image, setImage] = useState(null);  

  return (
    <AdminLayout title="Company Management">
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <CompanyFormContext>
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <BasicDetails />
          </Container>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Button variant="contained" type='submit'>
              Submit
            </Button>
          </Container>
        </CompanyFormContext>
      </Box>
    </AdminLayout>
  );
};

export default AddCompany;
