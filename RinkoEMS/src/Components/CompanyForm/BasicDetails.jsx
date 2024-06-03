import React from 'react';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import countyList from '../../../public/country.json'
const mandatoryError = 'This field is mandatory'

const BasicDetails = ({ fields }) => {
  const StatusOptions = [
    {
      label: 'Active',
      value: 'Active'
    },
    {
      label: 'Inactive',
      value: 'Inactive'
    },
    {
      label: 'Prospect',
      value: 'Prospect'
    }]



  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };
  const { register, formState: { errors },control } = useFormContext()

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'name'}
            label="Company Name"
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
            id={'address'}
            label="Address"
            variant="outlined"
            name='address'
            {
            ...register('address', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['address']}
            helperText={errors?.['address'] ? errors['address'].message : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'city'}
            label="City"
            variant="outlined"
            name='city'
            {
            ...register('city', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['city']}
            helperText={errors?.['city'] ? errors['city'].message : ""}
          />
        </Grid>
        

        <Grid item xs={6}>
         
          {/* <CountryDropdown /> */}
          <SelectAutoComplete   control={control} fieldName="country" label="Select Country" options={countyList}  />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'pin'}
            // type="tel"
            label="Postal Code"
            variant="outlined"
            name='pin'
            type ="number"
            {
            ...register('pin', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['pin']}
            helperText={errors?.['pin'] ? errors['pin'].message : ""}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'phone'}
            // type="tel"
            label="número de telèfon"
            variant="outlined"
            name='phone'
            type ="number"
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
          <TextField
            required
            id={'email'}
            fullWidth
            type ="number"
            label={'Email'}
            name='email'
            {
            ...register('email', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['email']}
            helperText={errors?.['email'] ? errors['email'].message : ""}

            variant="outlined"
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
        <BasicDatePicker   control={control} fieldName="caducidad" label="aducidad del NIE" size="small"/>
          
        </Grid>
        <Grid item xs={6}>
          <SelectAutoComplete control={control} fieldName={'status'} label={'Select Status'} options={StatusOptions} />

        </Grid>
        <Grid item xs={6}>
          <BasicDatePicker   control={control} fieldName="System_date" label="System Date" size="small"/>
        </Grid>
        
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
