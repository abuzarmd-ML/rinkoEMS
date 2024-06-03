import React from 'react';
import TextField from '@mui/material/TextField';
import { getCompanyName } from '../../api/companyApi';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import countyList from '../../../public/country.json'
const mandatoryError = 'This field is mandatory'

const BasicDetails = ({ fields }) => {

  const [companyList,setCompnayList] = React.useState([])
  const { register, formState: { errors }, control } = useFormContext()

  React.useEffect(()=>{
    getCompanyName().then((response)=>{
     setCompnayList([...response])
    })
  },[])

  const ClientStatusOptions = [
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

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Client Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'c_name'}
            label="Full Name"
            variant="outlined"
            name='c_name'
            {
            ...register('c_name', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['c_name']}
            helperText={errors?.['c_name'] ? errors['c_name'].message : ""}

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
            fullWidth
            type="text"
            label={'Email'}
            variant="outlined"
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

          />
        </Grid> 
        <Grid item xs={6}>
           <SelectAutoComplete control={control} fieldName={'company'} label={'Select company'} options={companyList}  />
        </Grid>
        
        <Grid item xs={6}>
          <BasicDatePicker   control={control} fieldName="dob" label="Date of birth" size="small"/>
        </Grid>
        <Grid item xs={6}>
         
          {/* <CountryDropdown /> */}
          <SelectAutoComplete   control={control} fieldName="country" label="Select Country" options={countyList}  />
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
            id={'name'}
            label="NIE"
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
          <SelectAutoComplete control={control} fieldName={'status'} label={'Select Status'} options={ClientStatusOptions} />

        </Grid>
        <Grid item xs={6}>
          <TextField
            
            fullWidth
            type="text"
            label={'Nota'}
            variant="outlined"
            name='nota'
            
            
          />
        </Grid> 
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
