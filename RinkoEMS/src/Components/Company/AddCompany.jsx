// src/AddCompany.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box, MenuItem } from '@mui/material';
import { getStatus } from '../../services/statusService'; // Import the getStatus function
import axiosInstance from '../../services/axiosInstance';

const AddCompany = () => {
  const [values, setValues] = useState({
    name: '',
    address: '',
    encargar: '',
    status: '',
  });

  const statusOptions = getStatus(); // Get the status options

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
      const response = axiosInstance('/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: values
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ADD Company
        </Typography>
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
