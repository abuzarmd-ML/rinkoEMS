import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import { fetchCompanies, deleteCompany } from '../../api/companyApi';
import MakeCompanyTable from './MakeCompanyTable';


const Company = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const companies = await fetchCompanies();
        setData(companies);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };
    getCompanies();
  }, []);

  const handleClickOpen = (companyId) => {
    console.log('Deleting company with ID:', companyId);
    setCompanyIdToDelete(companyId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCompanyIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(companyIdToDelete);
      setData(data.filter(company => company.company_id !== companyIdToDelete));
      handleClose();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    <AdminLayout title="company Management">
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <MakeCompanyTable data={data} handleClickOpen={handleClickOpen} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Company;
