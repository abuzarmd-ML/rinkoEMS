import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Typography, Select, MenuItem, InputLabel,FormControl} from '@mui/material';

import Cards from '../Cards/Cards';

const BasicDetails = ({ fields }) => {

  const [status, setStatus] = React.useState('');
  const [type, setType] = React.useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

  return (
    <Cards borderRadius={1} height={'400'}>
      <Grid container spacing={1} >

        <Grid item xs={12}>
          <Typography gutterBottom variant="h4" component="h3">
            Company Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            label={'Company'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select 
              labelId="type-label"
              id="type"
              fullWidth
              label={'Type'}
              value={type}
              onChange={handleTypeChange}
              variant="outlined"
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="At">Contract</MenuItem>
              <MenuItem value="Bj">Full Type</MenuItem>
              <MenuItem value="MB">Terminated</MenuItem>
          </Select>
          </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl variant="outlined" fullWidth>
      <InputLabel id="status-label">Status</InputLabel>
      <Select 
        labelId="status-label"
        id="status"
        fullWidth
        label={'Status'}
        value={status}
        onChange={handleStatusChange}
        variant="outlined"
      >
        <MenuItem value="">Select Status</MenuItem>
        <MenuItem value="At">Alta</MenuItem>
        <MenuItem value="Bj">Baja</MenuItem>
        <MenuItem value="MB">Medical Baja</MenuItem>
        <MenuItem value="Td">Terminated</MenuItem>
      </Select>
      </FormControl>
    </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="number"
            label="Rate"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Reference"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            label="Remarks"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;