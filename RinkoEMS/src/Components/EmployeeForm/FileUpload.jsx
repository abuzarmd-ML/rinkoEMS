import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';

const FileUpload = () => {
  const { setValue, watch } = useFormContext();
  const documents = watch("documents");

  const [photoPreview, setPhotoPreview] = useState(null);
  const [documentNames, setDocumentNames] = useState({});

  useEffect(() => {
    if (documents) {
      setDocumentNames({
        photo: documents.photo && typeof documents.photo === 'string' ? extractFilename(documents.photo) : null,
        license: documents.license && typeof documents.license === 'string' ? extractFilename(documents.license) : null,
        nie: documents.nie && typeof documents.nie === 'string' ? extractFilename(documents.nie) : null,
        resume: documents.resume && typeof documents.resume === 'string' ? extractFilename(documents.resume) : null,
        contract: documents.contract && typeof documents.contract === 'string' ? extractFilename(documents.contract) : null,
      });

      if (documents.photo && typeof documents.photo === 'string') {
        setPhotoPreview(documents.photo);
      }
    }
  }, [documents]);

  const handleFileChange = (field, file) => {
    setValue(`documents.${field}`, file, { shouldValidate: true });

    if (field === "photo") {
      const previewUrl = file ? URL.createObjectURL(file) : null;
      setPhotoPreview(previewUrl);
    }
    
    if (file) {
      setDocumentNames(prevNames => ({ ...prevNames, [field]: file.name }));
    }
  };
  // Clean up preview URLs when component unmounts to avoid memory leaks
useEffect(() => {
  return () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
  };
}, [photoPreview]);


  // Helper function to extract filename from a file path or URL
  const extractFilename = (filePath) => {
    return filePath.split('\\').pop().split('/').pop();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Document Upload</Typography>
      </Grid>

      {/* Photo preview */}
      {photoPreview && (
        <Grid item xs={12}>
          <Typography variant="body1">Photo Preview:</Typography>
          <img src={photoPreview} alt="Photo Preview" style={{ maxWidth: '120px', maxHeight: '100px', marginTop: '10px' }} />
        </Grid>
      )}

      {/* Photo upload */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: '115px', fontSize: '15px', fontWeight: 'bold' }}>
          Upload Photo (JPEG/PNG):
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange("photo", e.target.files[0])}
        />
        {documentNames.photo && <Typography variant="body2" sx={{ ml: 2 }}>{documentNames.photo}</Typography>}
      </Grid>

      {/* License upload */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: '45px', fontSize: '15px', fontWeight: 'bold' }}>
          Upload Driving License (JPEG/PNG):
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange("license", e.target.files[0])}
        />
        {documentNames.license && <Typography variant="body2" sx={{ ml: 2 }}>{documentNames.license}</Typography>}
      </Grid>

      {/* NIE upload */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: '135px', fontSize: '15px', fontWeight: 'bold' }}>
          Upload NIE (JPEG/PNG):
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange("nie", e.target.files[0])}
        />
        {documentNames.nie && <Typography variant="body2" sx={{ ml: 2 }}>{documentNames.nie}</Typography>}
      </Grid>

      {/* Resume upload */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: '150px', fontSize: '15px', fontWeight: 'bold' }}>
          Upload Resume (PDF):
        </Typography>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange("resume", e.target.files[0])}
        />
        {documentNames.resume && <Typography variant="body2" sx={{ ml: 2 }}>{documentNames.resume}</Typography>}
      </Grid>

      {/* Contract upload */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ marginRight: '150px', fontSize: '15px', fontWeight: 'bold' }}>
          Upload Contract (PDF):
        </Typography>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange("contract", e.target.files[0])}
        />
        {documentNames.contract && <Typography variant="body2" sx={{ ml: 2 }}>{documentNames.contract}</Typography>}
      </Grid>
    </Grid>
  );
};

export default FileUpload;
