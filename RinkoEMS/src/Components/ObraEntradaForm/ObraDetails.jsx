import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';
import { getObraId } from '../../api/ObraApi'; // Adjust path as per your project structure

const ObraDetails = () => {
  const { control, watch, setValue } = useFormContext();
  const [obrasList, setObraList] = useState([]);
  const selectedObraName = watch('obra_name', '');

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await getObraId();
        const formattedObras = response.map(obra => ({
          value: obra.obra_id,
          label: obra.obra_name, // Ensure label is a string
          address: obra.address
        })).filter(obra => obra.label !== undefined && obra.value !== null);
        setObraList(formattedObras);
        console.log("......obra..",formattedObras);
      } catch (error) {
        console.error('Error fetching obras:', error);
      }
    };

    fetchObras();
  }, []);

  const handleObraChange = (event) => {
    const selectedLabel = event.target.value;
    const selectedObra = obrasList.find(obra => obra.label === selectedLabel);
    if (selectedObra) {
      setValue('obra_name', selectedObra.label);
      setValue('obra_address', selectedObra.address);
    } else {
      setValue('obra_name', '');
      setValue('obra_address', '');
    }
  };

  useEffect(() => {
    if (selectedObraName) {
      const selectedObra = obrasList.find(obra => obra.label === selectedObraName);
      if (selectedObra) {
        setValue('obra_address', selectedObra.address);
      }
    }
  }, [selectedObraName, obrasList, setValue]);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Obra Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="obra_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Obra Name"
                onChange={(event) => {
                  field.onChange(event); // Update the form state
                  handleObraChange(event); // Handle the obra change
                }}
                value={selectedObraName || ''}
              >
                <MenuItem value="" disabled>Select Obra Name</MenuItem>
                {obrasList.map(obra => (
                  <MenuItem key={obra.value} value={obra.label}>{obra.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="obra_address"
            fullWidth
            name="obra_address"
            label="Obra Address"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={watch('obra_address') || ''}
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default ObraDetails;
