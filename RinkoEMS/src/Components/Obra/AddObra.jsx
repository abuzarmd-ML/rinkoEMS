import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicDetails from '../ClientForm/BasicDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar,Container } from '@mui/material';
import BankDetails from '../ObraForm/BankDetails';
import CompanyDetails from  '../ObraForm/CompanyDetails';
import FileUpload from '../ObraForm/FileUpload';
import ObraFormContext from './ObraFormContext'

const AddObra = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <AdminLayout title="Obra Management">
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
        <ObraFormContext  >
         <Toolbar />
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <BasicDetails />
          
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CompanyDetails />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        < BankDetails  />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        < FileUpload/>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button variant="contained" type='submit'>
          Submit
        </Button>
        </Container>
        </ObraFormContext>
      </Box>
    </AdminLayout>
  );
};

export default AddObra;
