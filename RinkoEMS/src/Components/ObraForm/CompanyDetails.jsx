import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import { getCompanyName } from '../../api/companyApi';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';

const CompanyDetails = () => {
  const [companyList, setCompanyList] = React.useState([]);
  const { setValue, control, register } = useFormContext();

  // Fetch company names and IDs
  React.useEffect(() => {
    getCompanyName().then((response) => {
      const formattedCompanies = response.map(company => ({
        label: company.name,  // Display company_name
        value: company.company_id  // Store company_id
      }));
      setCompanyList(formattedCompanies);
    });
  }, []);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {/* Use SelectAutoComplete component to display company names and store company_id */}
          <SelectAutoComplete
            control={control}
            fieldName="company_id"  // Store company_id internally
            label="Select Company"
            options={companyList}
          />
        </Grid>

        {/* Hidden input to store company_id */}
        <input type="hidden" {...register('company_id')} />
      </Grid>
    </Cards>
  );
};

export default CompanyDetails;
