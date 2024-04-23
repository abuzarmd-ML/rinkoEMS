import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

const BasicForm = ({ fields }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {fields.map((field, index) => (
        <div key={index}>
          {field.type === 'text' && (
            <TextField
              required
              id={field.name}
              label={field.placeholder}
              variant="outlined"
            />
          )}
          {field.type === 'textarea' && (
            <TextareaAutosize
              minRows={3}
              placeholder={field.placeholder}
              variant="outlined"
            //   style={{ width: '100%' }}
            />
          )}
          {field.type === 'phone' && (
            <TextField
              required
              id={field.name}
              label={field.placeholder}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">+1</InputAdornment>,
              }}
            />
          )}
          {field.type === 'date' && (
            <TextField
              id={field.name}
              label={field.placeholder}
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {/* Add more conditional rendering for other field types */}
        </div>
      ))}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default BasicForm;
