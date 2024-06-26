import React from 'react';
import TextField from '@mui/material/TextField';
import { getObraId } from '../../api/ObraApi';
import { getCompanyName } from '../../api/companyApi';
import { useFormContext } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import BasicDatePicker from '../BasicForm/DatePicker';
import SelectAutoComplete from '../BasicForm/SelectAutoComplete';
import ObraWebsiteField from '../ObraForm/ObraWebsiteField';

const mandatoryError = 'This field is mandatory';

const BasicDetails = ({ fields }) => {
  const [companyList, setCompanyList] = React.useState([]);
  const [obrasList, setObraList] = React.useState([]);
  const { register, formState: { errors }, control } = useFormContext();

  React.useEffect(() => {
    getObraId().then((response) => {
      const formattedObras = response.map(obra => ({
        value: obra.obra_id,
        label: String(obra.obra_id), // Ensure label is a string
        website: obra.obra_website
      })).filter(obra => obra.value !== undefined && obra.value !== null);
      setObraList(formattedObras);
    });
  }, []);

  React.useEffect(() => {
    getCompanyName().then((response) => {
      const formattedCompanies = response.map(company => ({
        label: company.name,
        value: company.company_id
      }));
      setCompanyList(formattedCompanies);
    });
  }, []);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'comunidad_name'}
            label="Comunidad_Name"
            variant="outlined"
            name='comunidad_name'
            {...register('comunidad_name', {
              required: {
                value: true,
                message: mandatoryError
              }
            })}
            error={errors?.['comunidad_name']}
            helperText={errors?.['comunidad_name'] ? errors['comunidad_name'].message : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectAutoComplete control={control} fieldName={'company'} label={'Select company'} options={companyList} />
        </Grid>
        <Grid item xs={6}>
          <ObraWebsiteField obrasList={obrasList} />
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
            {...register('nie', {
              required: {
                value: true,
                message: mandatoryError
              }
            })}
            error={errors?.['nie']}
            helperText={errors?.['nie'] ? errors['nie'].message : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'fact_email'}
            fullWidth
            type="text"
            label={'Fact Email'}
            variant="outlined"
            name='fact_email'
            {...register('fact_email', {
              required: {
                value: true,
                message: mandatoryError
              }
            })}
            error={errors?.['fact_email']}
            helperText={errors?.['fact_email'] ? errors['fact_email'].message : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicDatePicker control={control} fieldName="venc_days" label="Venc _Days" size="small" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'cudad_id'}
            fullWidth
            type="number"
            label={'Cudad_ID'}
            name='cudad_id'
            {...register('cudad_id', {
              required: {
                value: true,
                message: mandatoryError
              }
            })}
            error={errors?.['cudad_id']}
            helperText={errors?.['cudad_id'] ? errors['cudad_id'].message : ""}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;
