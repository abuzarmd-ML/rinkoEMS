import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
// import BasicForm from '../EmployeeForm/EmployeeForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AddObra = () => {

  const fields = [
    { type: 'text', name: 'firstName', placeholder: 'Enter Name' },
    { type: 'text', name: 'lastName', placeholder: 'Enter  last Name' },
    { type: 'text', name: 'phoneNumber', placeholder: 'Enter  phone number' },
    { type: 'date', name: 'dateOfBirth', placeholder: 'Enter  date of birth' },
    { type: 'text', name: 'address', placeholder: 'Enter  address' },
    // Add more fields as needed
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <AdminLayout title="Obra">
      <Box sx={{ p: 3, marginTop: '64px'}}>
        {/* <BasicForm fields={fields} /> */}
      </Box>
    </AdminLayout>
  );
};

export default AddObra;
