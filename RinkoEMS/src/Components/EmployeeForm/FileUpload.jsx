import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cards from '../Cards/Cards';

const DocumentUpload = ({ fields }) => {
  const [photo, setPhoto] = useState(null);
  const [idDocument, setIdDocument] = useState(null);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleIdDocumentChange = (event) => {
    setIdDocument(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
  };

  return (
    <Cards borderRadius={1} height={'400'}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h4" component="h3">
              Document Upload
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleIdDocumentChange}
            />
          </Grid>
        </Grid>
      </form>
    </Cards>
  );
};

export default DocumentUpload;
