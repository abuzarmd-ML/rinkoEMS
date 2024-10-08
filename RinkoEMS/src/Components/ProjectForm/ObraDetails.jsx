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
  const selectedObraId = watch('obra_id', '');

  // Fetch obras from backend
  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await getObraId();
        const formattedObras = response.map(obra => ({
          value: obra.obra_id,   // Obra ID to submit
          label: obra.obra_name, // Show obra name in the dropdown
          address: obra.address  // Additional obra details
        })).filter(obra => obra.value !== undefined && obra.value !== null);
        setObraList(formattedObras);
      } catch (error) {
        console.error('Error fetching obras:', error);
      }
    };
    fetchObras();
  }, []);

  // Handle obra selection
  const handleObraChange = (event) => {
    const selectedObraId = event.target.value;
    const selectedObra = obrasList.find(obra => obra.value === selectedObraId);
    
    if (selectedObra) {
      setValue('obra_id', selectedObra.value); // Set obra ID for submission
      setValue('obra_name', selectedObra.label); // Set obra name for display
      setValue('obra_address', selectedObra.address); // Populate obra address
    } else {
      setValue('obra_id', '');
      setValue('obra_name', '');
      setValue('obra_address', '');
    }
  };

  // Populate obra address if obra ID changes
  useEffect(() => {
    if (selectedObraId) {
      const selectedObra = obrasList.find(obra => obra.value === selectedObraId);
      if (selectedObra) {
        setValue('obra_address', selectedObra.address);
      }
    }
  }, [selectedObraId, obrasList, setValue]);

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Obra Details
          </Typography>
        </Grid>

        {/* Obra Name Dropdown */}
        <Grid item xs={4}>
          <Controller
            name="obra_id" // Bind to obra_id for submission
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                variant="outlined"
                label="Select Obra"
                onChange={(event) => {
                  field.onChange(event); // Update form state
                  handleObraChange(event); // Handle obra change
                }}
                value={selectedObraId || ''}
              >
                <MenuItem value="" disabled>Select Obra</MenuItem>
                {obrasList.map(obra => (
                  <MenuItem key={obra.value} value={obra.value}>
                    {obra.label} {/* Show obra name */}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Obra Address (Read-Only) */}
        <Grid item xs={4}>
          <TextField
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
