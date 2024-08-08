import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicDetails from '../ObraForm/BasicDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar,Container } from '@mui/material';
import ObraFormContext from './ObraEntradaFormContext';
import CompanyDetails from '../ObraEntradaForm/CompanyDetails';
import EmployeeDetails from '../ObraEntradaForm/EmployeeDetails';
import ObraDetails from '../ObraEntradaForm/ObraDetails';
import ProjectDetails from '../ObraEntradaForm/ProjectDetails';
import WorkDate from '../ObraEntradaForm/WorkDate';

const AddObraEntrada = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <AdminLayout title="Obra Entrada Management">
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
        <EmployeeDetails />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CompanyDetails />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ObraDetails />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ProjectDetails />
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <WorkDate />
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

export default AddObraEntrada;
