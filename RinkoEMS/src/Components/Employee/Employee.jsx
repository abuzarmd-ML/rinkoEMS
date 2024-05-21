import React, { Fragment, useEffect, useState } from 'react';
import { Box, Toolbar, Container, Grid, Paper, Typography,Button } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import BasicMuiTable from '../Table/BasicMuiTable';
import { fetchEmployees } from '../../api/employeeApi';


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
    { accessorKey: 'id', header: 'Actions', size: 200 , Cell:({row})=>{
        console.log("row: ", row,row.original.employee_id)
        return (<><Button href={`/employee/add/${row.original.employee_id}`} variant="outlined">View</Button>  <Button variant="outlined" color="error">Delete</Button></>)}
    },
];

const Employee = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const employees = await fetchEmployees();
                console.log("Frontend: ", employees)
                setData(employees);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        getEmployees();
    }, []);

    return (
        <AdminLayout title="Employee Management">
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
        </AdminLayout>
    );
};

export default Employee;
