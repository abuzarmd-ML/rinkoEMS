import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';

const mandatoryError = 'This field is mandatory'

const BankDetails = ({ fields }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };
  const { register, formState: { errors } } = useFormContext()

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={1} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Bank Details 
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            size='string'
            fullWidth
            label={'Bank Name'}
            variant="outlined"
            name="bankName"
            {
              ...register('bankName', {
                required: {
                  value: true,
                  message: mandatoryError
                }
              })
              }
              error={errors?.['bankName']}
              helperText={errors?.['bankName'] ? errors['bankName'].message : ""}
  
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'test'}
            label={'IBAN'}
            variant="outlined"
            name="IBAN"
            {
              ...register('IBAN', {
                required: {
                  value: true,
                  message: mandatoryError
                }
              })
              }
              error={errors?.['IBAN']}
              helperText={errors?.['IBAN'] ? errors['IBAN'].message : ""}
  
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BankDetails;