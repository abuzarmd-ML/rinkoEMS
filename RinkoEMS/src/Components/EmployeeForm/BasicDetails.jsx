import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import CountryDropdown from './CountryDropdown'


const mandatoryError = 'This field is mandatory'

const BasicDetails = ({ fields }) => {



  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };
  const { register, formState: { errors } } = useFormContext()

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'name'}
            label="Appaledos,nombre"
            variant="outlined"
            name='name'
            {
            ...register('name', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['name']}
            helperText={errors?.['name'] ? errors['name'].message : ""}

          />

        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'phone'}
            type="tel"
            label="número de telèfon"
            variant="outlined"
            name='phone'
            {
            ...register('phone', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['phone']}
            helperText={errors?.['phone'] ? errors['phone'].message : ""}

          />
        </Grid>

        <Grid item xs={6}>

          <CountryDropdown />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="date"
            label="Date of birth"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            name='dob'
            {
            ...register('dob', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['dob']}
            helperText={errors?.['dob'] ? errors['dob'].message : ""}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'nie'}
            fullWidth
            type="text"
            label={'NIE'}
            variant="outlined"
            name='nie'
            {
            ...register('nie', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['nie']}
            helperText={errors?.['nie'] ? errors['nie'].message : ""}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="date"
            label="Caducidad del NIE"
            name='caducidad'
            {
            ...register('caducidad', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['caducidad']}
            helperText={errors?.['caducidad'] ? errors['caducidad'].message : ""}

            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'social'}
            fullWidth
            type="text"
            label={'Seguridad Social'}
            name='social'
            {
            ...register('social', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['social']}
            helperText={errors?.['social'] ? errors['social'].message : ""}

            variant="outlined"
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
