import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Typography } from '@mui/material';
import Cards from '../Cards/Cards';

const EmployeeForm = ({ fields }) => {
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
            size='string'
            fullWidth
            label={'Full name'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'test'}
            label={'Full name'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id={'test'}
            fullWidth
            label={'Full name'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id={'test'}
            label={'Full name'}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            type='Date'
            size='small'
            id={'test'}
            label={'Date of birth'}
            variant="outlined"
          />
        </Grid>

      </Grid>
    </Cards>
  );
};

export default EmployeeForm;

// {fields.map((field, index) => (
//   <div key={index}>
//     {field.type === 'text' && (
//       <TextField
//         required
//         id={field.name}
//         label={field.placeholder}
//         variant="outlined"
//       />
//     )}
//     {field.type === 'textarea' && (
//       <TextareaAutosize
//         minRows={3}
//         placeholder={field.placeholder}
//         variant="outlined"
//       //   style={{ width: '100%' }}
//       />
//     )}
//     {field.type === 'phone' && (
//       <TextField
//         required
//         id={field.name}
//         label={field.placeholder}
//         variant="outlined"
//         InputProps={{
//           startAdornment: <InputAdornment position="start">+1</InputAdornment>,
//         }}
//       />
//     )}
//     {field.type === 'date' && (
//       <TextField
//         id={field.name}
//         label={field.placeholder}
//         type="date"
//         variant="outlined"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//     )}
//     {/* Add more conditional rendering for other field types */}
//   </div>
// ))}
// <Button variant="contained" type="submit">
//   Submit
// </Button>
