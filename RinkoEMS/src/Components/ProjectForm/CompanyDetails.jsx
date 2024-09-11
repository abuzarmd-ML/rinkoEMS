import { getCompanyName } from '../../api/companyApi';
import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';

const mandatoryError = 'This field is mandatory';

const CompanyDetails = ({ fields }) => {
  const [companyList, setCompanyList] = React.useState([]);
  const { register, watch, setValue, formState: { errors }, control } = useFormContext();
  const selectedCompanyName = watch('company_name', '');

  React.useEffect(() => {
    getCompanyName().then((response) => {
      const formattedCompanies = response.map(company => ({
        label: company.name,
        value: company.company_id
      })).filter(company => company.label !== undefined && company.value !== null);
      setCompanyList(formattedCompanies);
  
    });
  }, []);

  const handleCompanyChange = (selectedOption) => {
    if (selectedOption) {
      setValue('company_name', selectedOption.label);
      setValue('company_id', selectedOption.value);
    } else {
      setValue('company_name', '');
      setValue('company_id', '');
    }
    
  };

  React.useEffect(() => {
    if (selectedCompanyName) {
      const selectedCompany = companyList.find(company => company.label === selectedCompanyName);
      if (selectedCompany) {
        setValue('value', selectedCompany.company_id);
      }
    }
  }, [selectedCompanyName, companyList, setValue]);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="company_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Company Name"
                onChange={(e) => {
                  const selectedCompany = companyList.find(company => company.label === e.target.value);
                  field.onChange(e);
                  handleCompanyChange(selectedCompany);
                }}
                value={selectedCompanyName || ''}
              >
                <MenuItem value="" disabled>Select company Name</MenuItem>
                {companyList.map(company => (
                  <MenuItem key={company.value} value={company.label}>{company.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="company_id"
            fullWidth
            name="company_id"
            label="Company ID"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('company_id') || ''}
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default CompanyDetails;
