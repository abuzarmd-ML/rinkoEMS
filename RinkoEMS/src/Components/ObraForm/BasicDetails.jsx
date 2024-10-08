import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';
import { getCompanyName } from '../../api/companyApi';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import { fetchStatusOptions } from '../../api/dropdownOptionsApi';

const mandatoryError = 'This field is mandatory'

const BasicDetails = ({ fields }) => {
  const { register, formState: { errors }, control } = useFormContext()
  const [StatusOptions,setStatusOptions]= React.useState([])

  React.useEffect(() => {
    fetchStatusOptions().then((response) => {
      const formattedStatus = response.map(statuses => ({
        label: statuses.name,
        value: statuses.statuses_id
      }));
      setStatusOptions(formattedStatus);
    });
  }, []);

    const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

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
            id={'obra_name'}
            label="Obra Name"
            variant="outlined"
            name='obra_name'
            {
            ...register('obra_name', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['obra_name']}
            helperText={errors?.['obra_name'] ? errors['obra_name'].message : ""}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="text"
            label={'Address'}
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
          <SelectAutoComplete control={control} fieldName={'status'} label={'Select Status'} options={StatusOptions} />

        </Grid>

        <Grid item xs={6}>
          <BasicDatePicker   control={control} fieldName="F_Date" label="F_Date" size="small"/>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'website'}
            fullWidth
            type="text"
            label={'Obra Website'}
            variant="outlined"
            name='obra_website'
            {
            ...register('obra_website', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['obra_website']}
            helperText={errors?.['obra_website'] ? errors['obra_website'].message : ""}

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
            id={'email'}
            fullWidth
            type ="text"
            label={'email'}
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
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
