import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';

const DocumentUpload = ({ fields }) => {
  const [photo, setPhoto] = useState(null);
  const [resumeDocument, setResumeDocument] = useState(null);
  const [NIE, setNIE] = useState(null);
  const [License, setLicense] = useState(null);
  const [contract, setContract] = useState(null);
  const NIEInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const ResumPInputRef = useRef(null);
  const ContractInputRef = useRef(null);
  const DLInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleResumeDocumentChange = (event) => {
    setResumeDocument(event.target.files[0]);
  };
  const handleNIEChange = (event) => {
    setNIE(event.target.files[0]);
  };

  const handleDLChange = (event) => {
    setLicense(event.target.files[0]);
  };
  const handleContractChange = (event) => {
    setContract(event.target.files[0]);
  };

 
  const resetPhotoInput = () => {
    setPhoto(null);
    photoInputRef.current.value = null;
  };

  const resetNIEInput = () => {
    NIEInputRef.current.value = null;
  };

  const resetDLInput = () => {
    DLInputRef.current.value = null;
  };

  const resetResumeInput = () => {
    ResumPInputRef.current.value = null;
  };

  const resetContractInput = () => {
    ContractInputRef.current.value = null;
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

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '120px', fontSize: '15px', fontWeight: 'bold' }}>Upload Photo (JPEG/PNG):</Typography>
            <input
              ref={photoInputRef}
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
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '150px', fontSize: '15px', fontWeight: 'bold' }}>Upload Contract (PDF):</Typography>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
