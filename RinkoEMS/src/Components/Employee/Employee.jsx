import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
import { saveAs } from "file-saver";
import StatusChip from '../BasicForm/StatusChip';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchEmployees, deleteEmployee } from '../../api/employeeApi';

const Employee = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employees = await fetchEmployees();
        setData(employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    getEmployees();
  }, []);

  const handleClickOpen = (employeeId) => {
    setEmployeeIdToDelete(employeeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeIdToDelete);
      setData(data.filter(employee => employee.employee_id !== employeeIdToDelete));
      handleClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleExportToWord = () => {
    const filteredColumns = columns.filter(col => col.accessorKey !== 'id'); // Exclude "Actions" column

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Employee Data",
              heading: "Heading1",
            }),
            new Table({
              rows: [
                // Header row
                new TableRow({
                  children: filteredColumns.map(col =>
                    new TableCell({
                      children: [new Paragraph({ text: col.header, bold: true })],
                    })
                  ),
                }),
                // Data rows
                ...data.map(employee =>
                  new TableRow({
                    children: filteredColumns.map(col =>
                      new TableCell({
                        children: [new Paragraph({ text: employee[col.accessorKey]?.toString() || "" })],
                      })
                    ),
                  })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "EmployeeData.docx");
    });
  };

  const columns = [
    { accessorKey: 'name', header: 'Name', size: 150 },
    { accessorKey: 'phone', header: 'Phone', size: 150 },
    { accessorKey: 'nie', header: 'NIE', size: 150 },
    { accessorKey: 'social_security', header: 'Social Security', size: 150 },
    { accessorKey: 'company_name', header: 'Company Name', size: 150 },
    { accessorKey: 'type', header: 'Type', size: 150 },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 150,
      Cell: ({ cell }) => <StatusChip status={cell.getValue()} />,
    },
    { accessorKey: 'rate', header: 'Rate', size: 150 },
    { accessorKey: 'bank_name', header: 'Bank Name', size: 150 },
    { accessorKey: 'iban', header: 'IBAN', size: 150 },
    {
      accessorKey: 'id',
      header: 'Actions',
      size: 200,
      Cell: ({ row }) => (
        <>
          <Button href={`/employee/add/${row.original.employee_id}`} variant="outlined">View</Button>
          <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.original.employee_id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout title="Employee Management">
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} sx={{ m: "1px" }}>
            <Button variant="contained" color="primary" onClick={handleExportToWord} sx={{ mb: 2 }}>
              Download Word File
            </Button>
            <BasicMuiTable columns={columns} data={data} />
          </Grid>
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Employee;
