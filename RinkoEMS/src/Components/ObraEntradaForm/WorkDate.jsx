import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';

const WorkDate = () => {
  const methods = useForm();
  // const { control, watch, setValue } = useFormContext();
  // const selectedWorkDate = watch('work_date', '');

  // const handleWorkDateChange = (event) => {
  //   const selectedDate = event.target.value;
  //   setValue('work_date', selectedDate);
  // };

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Work Date
          </Typography>
        </Grid>
      
        <Grid item xs={6} sm={6}>
                <BasicDatePicker control={methods.control} fieldName="work_date" label="Work Date" size="small" />
        </Grid>

        {/* <Grid item xs={6} sm={6}>
          <Controller
            name="work_date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                variant="outlined"
                label="Select Work Date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  field.onChange(event);
                  handleWorkDateChange(event);
                }}
                value={selectedWorkDate || ''}
              />
            )}
          />
        </Grid> */}
      </Grid>
    </Cards>
  );
};

export default WorkDate;
