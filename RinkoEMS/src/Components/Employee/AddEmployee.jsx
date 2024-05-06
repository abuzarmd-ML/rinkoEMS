import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicForm from '../EmployeeForm/EmployeeForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar,Container } from '@mui/material';
import BankDetails from '../EmployeeForm/BankDetails';
const AddEmployee = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

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
          <BasicForm fields={fields} />
          
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        < BankDetails  />
        </Container>
        <div>
          <label htmlFor="imageUpload">Select Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {/* <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button> */}
      </Box>
    </AdminLayout>
  );
};

export default AddEmployee;
