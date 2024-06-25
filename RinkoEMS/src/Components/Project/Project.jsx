import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchProjects,deleteProjects } from '../../api/projectApi';

const Project = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projects = await fetchProjects();
        setData(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    getProjects();
  }, []);

  const handleClickOpen = (projectId) => {
    setProjectIdToDelete(projectId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProjectIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteProjects(projectIdToDelete);
      console.log("...........deleteing...........")
      setData(data.filter(project => project.project_id !== projectIdToDelete));
      handleClose();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const columns = [
    { accessorKey: 'project_id', header: 'Project Id', size: 150 },
    { accessorKey: 'comunidad_name', header: 'Comunidad Name', size: 150 },
    { accessorKey: 'nie', header: 'NIE', size: 150 },
    { accessorKey: 'fact_email', header: 'Fact Email', size: 150 },
    { accessorKey: 'company', header: 'Company ID', size: 150 },
    { accessorKey: 'obra_id', header: 'Obra ID', size: 150 },
    { accessorKey: 'obra_website', header: 'obra Website', size: 150 },
    { accessorKey: 'cudad_id', header: 'cudad Id', size: 150 },
    { accessorKey: 'venc_days', header: 'venc Days', size: 150 },
    {
      accessorKey: 'id', header: 'Actions', size: 200, Cell: ({ row }) => {
        return (
          <>
            <Button href={`/project/add/${row.original.project_id}`} variant="outlined">View</Button>
            <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.project_id)}>Delete</Button>
          </>
        )
      }
    },
  ];

  return (
    <AdminLayout title="Project Management">
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
            Are you sure you want to delete this project? This action cannot be undone.
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

export default Project;
