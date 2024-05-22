import React, { useState, useEffect } from 'react';
import { useForm, Form } from '../BasicForm/useForm';
import { Grid, TextField,Button } from '@mui/material';
import FormInputElement from '../BasicForm/FormInputElement';
import Controls from '../BasicForm/Controls';
import { getStatus } from '../../services/statusService';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom'


const initialFValues = {
    companyName: '',
    address: '',
    nif: '',
    status: '',
    contactNumber: '',
    // startDate: new Date(),
};

export default function AddCompany() {
    const { values, setValues, handleInputChange } = useForm(initialFValues);
    const statusOptions = getStatus();

    const navigate = useNavigate()
    const handleSubmit = (formData,e)=>{
     e.preventDefault()
     console.log('form-data',formData)
     axiosInstance({
      url: '/add_company',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    }).then(response => {
              navigate('/company');
    })
    .catch(error => {
      // Handle network errors or other exceptions
      console.error("Error in submitting employee form:", error);
      setError(true);
    });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormInputElement
                        name="companyName"
                        label="Company Name"
                        value={values.companyName}
                        onChange={handleInputChange}
                    />
                    <FormInputElement
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <FormInputElement
                        name="contactNumber"
                        label="Contact Number"
                        value={values.contactNumber}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormInputElement
                        name="nif"
                        label="NIF"
                        value={values.nif}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={statusOptions}
                    />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Form>
    );
}
