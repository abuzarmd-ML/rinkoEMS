// ObraWebsiteField.jsx
import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const ObraWebsiteField = ({ obrasList }) => {
  const { control, watch, setValue } = useFormContext();
  const selectedObraId = watch('obra_id', '');

  const handleObraChange = (selectedOption) => {
    if (selectedOption) {
      setValue('obra_id', selectedOption.value);
      setValue('obra_website', selectedOption.website);
    } else {
      setValue('obra_id', '');
      setValue('obra_website', '');
    }
  };

  React.useEffect(() => {
    if (selectedObraId) {
      const selectedObra = obrasList.find(obra => obra.value === selectedObraId);
      if (selectedObra) {
        setValue('obra_website', selectedObra.website);
      }
    }
  }, [selectedObraId, obrasList, setValue]);

  return (
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
              onChange={(e) => handleObraChange(obrasList.find(obra => obra.value === e.target.value))}
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

  );
};

export default ObraWebsiteField;
