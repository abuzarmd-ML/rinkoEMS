import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import StatusChip from '../BasicForm/StatusChip';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchObra, deleteObra } from '../../api/ObraApi';

const Obra = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [obraIdToDelete, setObraIdToDelete] = useState(null);

  useEffect(() => {
    const getObra = async () => {
      try {
        const obra = await fetchObra();
        setData(obra);
      } catch (error) {
        console.error('Error fetching obra:', error);
      }
    };
    getObra();
  }, []);

  const handleClickOpen = (obraId) => {
    setObraIdToDelete(obraId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setObraIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteObra(obraIdToDelete);
      setData(data.filter(obra => obra.obra_id !== obraIdToDelete));
      handleClose();
    } catch (error) {
      console.error('Error deleting obra:', error);
    }
  };

  const columns = [
    { accessorKey: 'obra_name', header: 'Obra Name', size: 150 },
    { accessorKey: 'phone', header: 'Phone', size: 150 },
    { accessorKey: 'address', header: 'Address', size: 150 },
    { accessorKey: 'nie', header: 'NIE', size: 150 },
    { accessorKey: 'F_Date', header: 'F_Date', size: 150 },
    { accessorKey: 'email', header: 'Email', size: 150 },
    { accessorKey: 'company_name', header: 'Company Name', size: 150 },
    { accessorKey: 'company_address', header: 'Company Addreess', size: 150 },
    { accessorKey: 'obra_website', header: 'Website', size: 150 },
    {accessorKey: 'status',header: 'Status',size: 150,
      Cell: ({ cell }) => <StatusChip status={cell.getValue()} />,
    },
    {
      accessorKey: 'id', header: 'Actions', size: 200, Cell: ({ row }) => {
        return (
          <>
            <Button href={`/obra/add/${row.original.obra_id}`} variant="outlined">View</Button>
            <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.obra_id)}>Delete</Button>
          </>
        )
      }
    },
  ];

  return (
    <AdminLayout title="Obra Management">
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
            Are you sure you want to delete this obra? This action cannot be undone.
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

export default Obra;
