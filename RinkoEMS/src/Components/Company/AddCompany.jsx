import React,{useState,useEffect} from 'react';
import { useForm,Form } from '../BasicForm/useForm';
import { Grid, TextField } from '@mui/material';
import FormInputElement from '../BasicForm/FormInputElement';
import Controls from '../BasicForm/Controls';
import { getStatus } from '../../services/statusService';

const initialFValues = {
    companyName: '',
    address:'',
    nif: 0,
    status:'',
    contactNumber:0,
    // startDate: new Date(),
}
// const mandatoryError = 'This field is mandatory'


export default function AddCompany() {

    const {values,setValues,handleInputChange} = useForm(initialFValues);
    const statusOptions = getStatus();

    return (
        <Form >
            <Grid container>
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
                    name = "status"
                    label = "Status"
                    value = {values.status}
                    onChange = {handleInputChange}
                    options = {statusOptions}
                    />
                </Grid>
            <div>
                <Controls.Button
                    text = "Submit"
                />
            </div>
            </Grid>
        </Form>
    )
}

