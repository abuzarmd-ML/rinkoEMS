import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import Box from '@mui/material/Box';
import { Toolbar, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, TextField } from '@mui/material';
import AddCompany from './AddCompany';
import { getAllCompany } from '../../api/companyApi';
import { useNavigate } from 'react-router-dom';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllCompany().then((response) => {
      setCompanies([...response]);
    });
  }, []);

  const handleCompanyAdded = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const handleDelete = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await deleteCompany(companyId);
        setCompanies(companies.filter(company => company.id !== companyId));
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.encargar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <TextField
                label="Search"
                variant="outlined"
                size="medium"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Encargar</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCompanies
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell>{company.encargar}</TableCell>
                        <TableCell>{company.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => navigate(`/company/view/${company.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(company.id)}
                            style={{ marginLeft: '8px' }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCompanies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default Company;
