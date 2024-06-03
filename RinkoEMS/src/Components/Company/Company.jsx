import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchCompanies, deleteCompany } from '../../api/companyApi';

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

  const columns = [
    { accessorKey: 'name', header: 'Name', size: 150 },
    { accessorKey: 'phone', header: 'Phone', size: 150 },
    { accessorKey: 'country', header: 'Country', size: 150 },
    { accessorKey: 'dob', header: 'DOB', size: 150 },
    { accessorKey: 'nie', header: 'NIE', size: 150 },
    { accessorKey: 'caducidad', header: 'Caducidad', size: 150 },
    { accessorKey: 'social_security', header: 'Social Security', size: 150 },
    { accessorKey: 'company_id', header: 'Company ID', size: 150 },
    { accessorKey: 'type', header: 'Type', size: 150 },
    { accessorKey: 'status', header: 'Status', size: 150 },
    { accessorKey: 'rate', header: 'Rate', size: 150 },
    { accessorKey: 'reference', header: 'Reference', size: 150 },
    { accessorKey: 'remarks', header: 'Remarks', size: 150 },
    { accessorKey: 'bank_name', header: 'Bank Name', size: 150 },
    { accessorKey: 'iban', header: 'IBAN', size: 150 },
    {
      accessorKey: 'id', header: 'Actions', size: 200, Cell: ({ row }) => {
        return (
          <>
            <Button href={`/company/add/${row.original.company_id}`} variant="outlined">View</Button>
            <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.company_id)}>Delete</Button>
          </>
        )
      }
    },
  ];

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
          <Grid spacing={2} sx={{ m: "1px" }}>
            <BasicMuiTable columns={columns} data={data} />
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
