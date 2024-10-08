import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import StatusChip from '../BasicForm/StatusChip';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchObraEntrada,deleteObraEntrada } from '../../api/ObraEntradaApi';

const ObraEntrada = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [obraEntradaIdToDelete, setObraEntradaIdToDelete] = useState(null);


  useEffect(() => {
    const getObraEntrada = async () => {
      try {
        const data = await fetchObraEntrada();
        console.log("Fetched data:", data);  // Check if `obraentrada_id` is present in the data
     
        setData(data);
      } catch (error) {
        console.error('Error fetching obraEntrada:', error);
        setError('Failed to fetch Obra');
      }
    };

    getObraEntrada();
  }, []);

  
  const handleClickOpen = (obraEntradaId) => {
    console.log("Opening delete dialog for obraEntradaId:", obraEntradaId); // Log to check
 
    setObraEntradaIdToDelete(obraEntradaId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setObraEntradaIdToDelete(null);
  };
  

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete obraEntrada with ID:', obraEntradaIdToDelete);
      await deleteObraEntrada(obraEntradaIdToDelete);
      setData(data.filter(obraEntrada => obraEntrada.obraentrada_id !== obraEntradaIdToDelete));
      handleClose();
    } catch (error) {
      console.error('Error deleting obra Entrada:', error);
    }
  };

  const columns = [
    { accessorKey: 'emp_name', header: 'Emp Name', size: 150 },
    { accessorKey: 'emp_type', header: 'Emp NIE', size: 150 },
    { accessorKey: 'emp_social_security', header: 'Emp Social_Sec No', size: 150 },
    { accessorKey: 'company_name', header: 'Company Name', size: 150 },
    { accessorKey: 'work_date', header: 'Work Date', size: 150 },
    { accessorKey: 'obra_name', header: 'Obra Name', size: 150 },
    { accessorKey: 'obra_address', header: 'Obra Address', size: 150 },
    { accessorKey: 'project_name', header: 'Project Name', size: 150 },
    {accessorKey: 'company_status',header: 'Company Status',size: 150,
      Cell: ({ cell }) => <StatusChip status={cell.getValue()} />,
    },
    {
      accessorKey: 'id', header: 'Actions', size: 200, Cell: ({ row }) => {
        console.log(".......row",row.original); 
        return (
          <>
            <Button href={`/obra_entrada/add/${row.original.obraentrada_id}`} variant="outlined">View</Button>
            <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.obraentrada_id)}>Delete</Button>
          </>
        )
      }  
    },
  ];
 

  return (
    <AdminLayout title="Obra Entrada Management">
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
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
            Are you sure you want to delete this obra Entrada? This action cannot be undone.
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

export default ObraEntrada;
