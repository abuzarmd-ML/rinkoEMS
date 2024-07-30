import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import Cards from '../Cards/Cards';
import { getCompanyName } from '../../api/companyApi';
import { fetchEmployeeStatus, fetchEmployeeTypes } from '../../api/dropdownOptionsApi';

const mandatoryError = 'This field is mandatory'

const BasicDetails = ({ fields }) => {

  const [companyList,setCompnayList] = React.useState([])
  const { register, formState: { errors }, control } = useFormContext()
  const [EmployeeStatusOptions,setEmployeeStatusOptions]= React.useState([])
  const [employeeTypeOptions,setEmployeeTypeOptions]= React.useState([])

  React.useEffect(() => {
    getCompanyName().then((response) => {
      const formattedCompanies = response.map(company => ({
        label: company.name,
        value: company.company_id
      }));
      setCompnayList(formattedCompanies);
    });
  }, []);

  React.useEffect(() => {
    fetchEmployeeStatus().then((response) => {
      const formattedStatus = response.map(employee_statuses => ({
        label: employee_statuses.name,
        value: employee_statuses.employee_statuses_id
      }));
      setEmployeeStatusOptions(formattedStatus);
    });
  }, []);

  React.useEffect(() => {
    fetchEmployeeTypes().then((response) => {
      const formattedEmployeeTypes = response.map(employee_types => ({
        label: employee_types.name,
        value: employee_types.employee_types_id
      }));
      setEmployeeTypeOptions(formattedEmployeeTypes);
    });
  }, []);


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
          <SelectAutoComplete control={control} fieldName={'status'} label={'Select Status'} options={EmployeeStatusOptions} />

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