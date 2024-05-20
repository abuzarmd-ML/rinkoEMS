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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('resume', resumeDocument);

    try {
      // Send POST request to upload documents
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      // Handle response
      if (response.ok) {
        console.log('Documents uploaded successfully');
      } else {
        console.error('Failed to upload documents');
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          Document Upload
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={photo ? URL.createObjectURL(photo) : ''} alt="Preview" style={{ width: '12%', maxHeight: '70px', marginBottom: '10px' }} />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photo && (
              <Button onClick={resetPhotoInput}>X</Button>
            )}
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '140px', fontSize: '15px', fontWeight: 'bold' }}>Upload NIE (JPEG/PNG):</Typography>
            <input
              ref={NIEInputRef}
              type="file"
              accept="image/*"
              onChange={handleNIEChange}
            />
            {NIE && (
              <Button onClick={resetNIEInput}>X</Button>
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>

            <Typography variant="body1" sx={{ marginRight: '49px', fontSize: '15px', fontWeight: 'bold' }}>Upload Driving License (JPEG/PNG):</Typography>
            <input
              ref={DLInputRef}
              type="file"
              accept="image/*"
              onChange={handleDLChange}
            />
            {License && (
              <Button onClick={resetDLInput}>X</Button>
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '150px', fontSize: '15px', fontWeight: 'bold' }}>Upload Resume (PDF):</Typography>
            <input
              ref={ResumPInputRef}
              type="file"
              accept=".pdf"
              onChange={handleResumeDocumentChange}
            />
            {resumeDocument && (
              <Button onClick={resetResumeInput}>X</Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <input
              ref={ContractInputRef}
              type="file"
              accept=".pdf"
              onChange={handleContractChange}
            />
            {contract && (
              <Button onClick={resetContractInput}>X</Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Upload Documents
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Upload Documents
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
