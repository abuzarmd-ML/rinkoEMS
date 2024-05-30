import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import Cards from '../Cards/Cards';
import { getCompanyName } from '../../api/companyApi';
const mandatoryError = 'This field is mandatory'

const statusOptions = [
  {
    label: 'Alta',
    value: 'Alta'
  },
  {
    label: 'Baja',
    value: 'Baja'
  },
  {
    label: 'Medical Baja',
    value: 'Medical Baja'
  },
  {
    label: 'Terminated',
    value: 'Terminated'
  }
]

const employeeTypeOptions = [
  {
    label: 'Contract',
    value: 'Contract'
  },
  {
    label: 'Full Type',
    value: 'Full Type'
  },
  {
    label: 'Terminated',
    value: 'Terminated'

  }]

const BasicDetails = ({ fields }) => {

  const [companyList,setCompnayList] = React.useState([])
  const { register, formState: { errors }, control } = useFormContext()

  React.useEffect(()=>{
    getCompanyName().then((response)=>{
     setCompnayList([...response])
    })
  },[])
  

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={1} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>

        <Grid item xs={6}>
           <SelectAutoComplete control={control} fieldName={'company'} label={'Select company'} options={companyList}  />
        </Grid>
        
        <Grid item xs={6}>
          <SelectAutoComplete control={control} fieldName={'type'} label={'Select Employee Type'} options={employeeTypeOptions} defaultValue={'Contract'} />

        </Grid>
        <Grid item xs={6}>
          <SelectAutoComplete control={control} fieldName={'status'} label={'Select Status'} options={statusOptions} />

        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Rate"
            variant="outlined"
            name="rate"
            {
            ...register('rate', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['rate']}
            helperText={errors?.['rate'] ? errors['rate'].message : ""}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Reference"
            variant="outlined"
            name="reference"
            {
            ...register('reference', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['reference']}
            helperText={errors?.['reference'] ? errors['reference'].message : ""}

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="Remarks"
            variant="outlined"
            name="remarks"
            {
            ...register('remarks', {
              required: {
                value: true,
                message: mandatoryError
              }
            })
            }
            error={errors?.['remarks']}
            helperText={errors?.['remarks'] ? errors['remarks'].message : ""}

          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;