import React, { useState } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import BasicForm from '../BasicForm/BasicForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
      <Box sx={{ p: 3, marginTop: '64px'}}>
        <BasicForm fields={fields} />
        {/* Image Upload Field */}
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
