// src/components/WorkDate.jsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, TextField, Typography, MenuItem } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';

const WorkDate = () => {
  const { control } = useFormContext(); // Access useFormContext to get the control

  return (
    <Cards borderRadius={1} height={'400'}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h4" component="h3">
          Work Details
        </Typography>
      </Grid>
      <Grid item xs={4}>
         <BasicDatePicker
        control={control}
        fieldName="work_date"
        label="Work Date"
       />
      </Grid>
    </Grid>
  </Cards>    
  );
};

export default WorkDate;
