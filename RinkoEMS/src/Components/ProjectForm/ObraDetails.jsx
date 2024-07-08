import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Cards from '../Cards/Cards';
import { getObraId } from '../../api/ObraApi'; // Adjust path as per your project structure

const ObraDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const [obrasList, setObraList] = useState([]);
  const selectedObraId = watch('obra_id', '');

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await getObraId();
        const formattedObras = response.map(obra => ({
          value: obra.obra_id,
          label: String(obra.obra_id), // Ensure label is a string
          website: obra.obra_website
        })).filter(obra => obra.value !== undefined && obra.value !== null);
        setObraList(formattedObras);
      } catch (error) {
        console.error('Error fetching obras:', error);
      }
    };

    fetchObras();
  }, []);

  const handleObraChange = (event) => {
    const selectedObraId = event.target.value;
    const selectedObra = obrasList.find(obra => obra.value === selectedObraId);
    if (selectedObra) {
      setValue('obra_id', selectedObra.value);
      setValue('obra_website', selectedObra.website);
    } else {
      setValue('obra_id', '');
      setValue('obra_website', '');
    }
  };

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={1}>
        <Grid item xs={8} sm={5}>
          <Controller
            name="obra_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Obra ID"
                onChange={(event) => {
                  field.onChange(event); // Update the form state
                  handleObraChange(event); // Handle the obra change
                }}
                value={selectedObraId || ''}
              >
                <MenuItem value="" disabled>Select Obra ID</MenuItem>
                {obrasList.map(obra => (
                  <MenuItem key={obra.value} value={obra.value}>{obra.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} sm={7}>
          <TextField
            required
            id="obra_website"
            fullWidth
            name="obra_website"
            label="Obra Website"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('obra_website') || ''}
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default ObraDetails;
