// src/Company.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import Box from '@mui/material/Box';
import { Toolbar, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddCompany from './AddCompany';
import { getAllCompany } from '../../api/companyApi';
import axiosInstance from '../../services/axiosInstance';

const Company = () => {
  const [companies, setCompanies] = useState([]);

  React.useEffect(()=>{
    getAllCompany().then((response)=>{
      setCompanies([...response])
    })
  },[])

  const handleCompanyAdded = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  return (
    <AdminLayout title="Company">
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
          <Paper sx={{ p: 2 }}>
            <AddCompany onCompanyAdded={handleCompanyAdded} />
          </Paper>
        </Container>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Encargar</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.address}</TableCell>
                      <TableCell>{company.encargar}</TableCell>
                      <TableCell>{company.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default Company;
