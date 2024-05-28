// src/AddCompany.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box, MenuItem, Alert } from '@mui/material';
import { getStatus } from '../../services/statusService'; // Import the getStatus function
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddCompany = () => {
  const initialValues = {
    name: '',
    address: '',
    encargar: '',
    status: '',
  };

  const [values, setValues] = useState(initialValues);

  const statusOptions = getStatus(); // Get the status options
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/companies', values); // Await the response
      console.log("RESPONSE:::", response);
      if (response.status >= 200 && response.status < 300) {
        // Handle successful signup (e.g., show success message, redirect to login page)
        console.log('Company created successfully');
        setSignupSuccessMessage('New Company Added');
        setSignupErrorMessage(''); // Clear any previous error message

        // Clear form inputs
        setValues(initialValues);

        setTimeout(() => {
          navigate('/companies');
        }, 2000);
      } else {
        // If the response status is not in the success range, throw an error
        throw new Error('Failed to create Company');
      }
    } catch (error) {
      console.error('Error Creating Company:', error);
      // Handle signup error (e.g., display error message to user)
      setSignupErrorMessage('Failed to create Company');
      setSignupSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ADD Company
        </Typography>
        {signupSuccessMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {signupSuccessMessage}
          </Alert>
        )}
        {signupErrorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {signupErrorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Company Name"
                value={values.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                name="address"
                label="Address"
                value={values.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="encargar"
                label="Encargar"
                value={values.encargar}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                select
                name="status"
                label="Status"
                value={values.status}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button variant="contained" color="primary" size="large" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddCompany;
