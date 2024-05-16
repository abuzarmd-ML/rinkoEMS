import React,{useState,useEffect} from 'react';
import { useForm,Form } from '../BasicForm/useForm';
import { Grid, TextField } from '@mui/material';

const initialFValues = {
    companyName: '',
    address:'',
    nif: 0,
    status:'',
    encarger:'',
    contactNumber:0,
    startDate: new Date()
}
// const mandatoryError = 'This field is mandatory'


export default function AddCompany() {

    const {values,setValues,handleInputChange} = useForm(initialFValues);

    return (
        <Form >
            <Grid container>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    label="Company Name"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleInputChange}
                />


                </Grid>
            </Grid>
        </Form>
    )
}

