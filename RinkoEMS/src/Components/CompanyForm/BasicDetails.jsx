import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Grid, TextField, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import countryList from '../../../public/country.json';

const BasicDetails = () => {
  const StatusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Prospect', value: 'Prospect' }
  ];

  const { control, formState: { errors } } = useFormContext();

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Company Name"
                variant="outlined"
                {...field}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Address"
                variant="outlined"
                {...field}
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="City"
                variant="outlined"
                {...field}
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectAutoComplete
            control={control}
            fieldName="country"
            label="Select Country"
            options={countryList}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Postal Code"
                variant="outlined"
                type="number"
                {...field}
                error={!!errors.pincode}
                helperText={errors.pincode ? errors.pincode.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Phone Number"
                variant="outlined"
                type="number"
                {...field}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                {...field}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="nie"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                type="text"
                label="NIE"
                variant="outlined"
                {...field}
                error={!!errors.nie}
                helperText={errors.nie ? errors.nie.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicDatePicker
            control={control}
            fieldName="caducidad"
            label="Caducidad del NIE"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <SelectAutoComplete
            control={control}
            fieldName='status'
            label='Select Status'
            options={StatusOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicDatePicker
            control={control}
            fieldName="system_date"
            label="System Date"
            size="small"
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
