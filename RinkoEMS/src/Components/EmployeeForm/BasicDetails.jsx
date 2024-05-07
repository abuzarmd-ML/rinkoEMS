import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Typography, Select, MenuItem, InputLabel,FormControl} from '@mui/material';
import Cards from '../Cards/Cards';


const BasicDetails = ({ fields }) => {

  const [country, setCountry] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
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
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            label={'Apalledos, Nombre'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'test'}
            type="tel"
            label="número de telèfon"
            variant="outlined"
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            label={'Country'}
            variant="outlined"
          />
        </Grid> */}
      <Grid item xs={6}>
      <FormControl variant="outlined" fullWidth>
      <InputLabel id="country-label">Country</InputLabel>
      <Select 
        labelId="country-label"
        id="country"
        fullWidth
        label={'Country'}
        value={country}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value="">Select Country</MenuItem>
        <MenuItem value="USA">United States</MenuItem>
        <MenuItem value="UK">United Kingdom</MenuItem>
        <MenuItem value="CA">Canada</MenuItem>
        {/* Add more countries as needed */}
      </Select>
      </FormControl>
    </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="date"
            label="Date of birth"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            type="text"
            label={'NIE'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type="date"
            label="Caducidad del NIE"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            type="text"
            label={'Seguridad Social'}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Cards>
  );
};

export default BasicDetails;