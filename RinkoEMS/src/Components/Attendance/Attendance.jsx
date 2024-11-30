import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, Button, TableCell, TableContainer, TableHead, TableRow, Paper, Container, TextField, Card, CardContent, Grid, Autocomplete } from '@mui/material';
import AttendanceInput from '../Cards/AttendanceInput';
import AdminLayout from '../Layout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { fetchFilterDataApi, fetchAttendanceDataApi, markAttendanceApi } from '../../api/AttendanceApi';

const AttendancePage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [obraEntradas, setObraEntradas] = useState([]); // Store the raw data
  const [filters, setFilters] = useState({
    company: null,
    project: null,
    obra: null,
    employee: null,
  });
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate(); // Initialize the hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilterDataApi();
        setObraEntradas(data.obraEntradas); // Full data stored
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };
    fetchData();
  }, []);

  // Helper function to remove duplicates by a specific key
  const removeDuplicates = (array, key) => {
    return [...new Map(array.map(item => [item[key], item])).values()];
  };

  // Extract unique companies from obraEntradas
  const companyList = removeDuplicates(obraEntradas.map(item => ({
    id: item.company_id,
    name: item.company_name,
  })), 'id');

  const searchByObraList= removeDuplicates(obraEntradas.map(item => ({
    id: item.obra_id,
    name: item.obra_name,
  })), 'id');

  // Extract unique options based on filters
const getFilteredOptions = (key) => {
  // Filter by company first
  if (!filters.company) return [];

  // Filter by company for obra
  if (key === 'obra') {
    return removeDuplicates(
      obraEntradas.filter(item => item.company_id === filters.company.id)
        .map(item => ({
          id: item.obra_id,
          name: item.obra_name,
        })),
      'id'
    );
  }

  // Filter by both company and obra for project
  if (key === 'project') {
    if (!filters.obra) return [];
    return removeDuplicates(
      obraEntradas.filter(item => 
        item.company_id === filters.company.id && 
        item.obra_id === filters.obra.id
      ).map(item => ({
        id: item.project_id,
        name: item.project_name,
      })),
      'id'
    );
  }

  // Filter by company, obra, and project for employees
  if (key === 'emp') {
    if (!filters.project) return [];
    return obraEntradas
      .filter(item => 
        item.company_id === filters.company.id &&
        item.obra_id === filters.obra.id &&
        item.project_id === filters.project.id
      )
      .map(item => ({
        id: item.emp_id,
        name: item.emp_name,
      })); // No duplicate removal here
  }

  return [];
};

// Usage in the component:
const filteredObras = filters.company ? getFilteredOptions('obra') : [];
const filteredProjects = filters.obra ? getFilteredOptions('project') : [];
const filteredEmployees = filters.project ? getFilteredOptions('emp') : [];

  

  useEffect(() => {
    const fetchAttendance = async () => {
      // Fetch attendance data based on filters if all are set
      if (filters.company && filters.obra && filters.project && filters.employee) {
        try {
          const data = await fetchAttendanceDataApi({
            company: filters.company.id,
            project: filters.project.project_id,
            obra: filters.obra.obra_id,
            searchObra:filters.obra.obra_id,
            employee: filters.employee.emp_id
          });
          setFilteredData(data);
        } catch (error) {
          console.error("Failed to fetch attendance data:", error);
        }
      }
    };

    fetchAttendance();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => {
      let updatedFilters = { ...prevFilters, [field]: value };

      // Reset subsequent filters
      if (field === 'company') {
        updatedFilters = { company: value, obra: null, project: null, employee: null };
      } else if (field === 'obra') {
        updatedFilters = { ...updatedFilters, project: null, employee: null };
      } else if (field === 'project') {
        updatedFilters = { ...updatedFilters, employee: null };
      }
      else if (field === 'employee') {
        updatedFilters = { ...updatedFilters, searchObra: null };
      } else if (field === 'searchObra') {
        // Reset other filters when searchObra is changed
        updatedFilters = { ...updatedFilters, company: null, obra: null, project: null, employee: null };
      }

       // Clear filtered data and hide the table
    setFilteredData([]); 
    setShowTable(false); 

      return updatedFilters;
    });
  };

  const handleViewClick = async () => {
    if (filters.company && filters.obra && filters.project && filters.employee) {
      try {
        // Fetch data based on the selected dropdown values
        const data = await fetchAttendanceDataApi({
          company: filters.company.id,
          project: filters.project.id,
          obra: filters.obra.id,
          employee: filters.employee.id
        });
  
        // Ensure only the exact match for the selected dropdowns is returned
        const filteredRow = data.find(item => 
          item.company_id === filters.company.id &&
          item.project_id === filters.project.id &&
          item.obra_id === filters.obra.id &&
          item.emp_id === filters.employee.id
        );
  
        // If an exact match is found, set it in the state, otherwise clear
        setFilteredData(filteredRow ? [filteredRow] : []);
        setShowTable(!!filteredRow);  // Only show the table if a matching row is found
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
        setFilteredData([]); // Reset in case of error
        setShowTable(false);
      }
    }
  };

  const handleObraViewClick = async () => {
    if (filters.searchObra) {
      try {
        const data = await fetchAttendanceDataApi({
          searchObra: filters.searchObra.id
        });
       
         // Filter all rows with matching obra_id
      const filteredRow = data.filter(item => item.obra_id === filters.searchObra.id);

  
        setFilteredData(filteredRow);
        setShowTable(filteredRow.length > 0);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
        setFilteredData([]);
        setShowTable(false);
      }
    }
  };
  
   // Mark Attendance Handler - Place this function here
   const handleMarkAttendance = (empId) => {
    navigate(`/mark-attendance/${empId}`);
    // const url = `/mark-attendance/${empId}`; // Adjust the route as needed
    
    // window.location.href = url; 
    // window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <AdminLayout title="Attendance System">
      <Box sx={{ mt: 15, mb: 5, ml: 3, mr: 3, width: '100%' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Search Employee</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Autocomplete
                  options={companyList}
                  getOptionLabel={(option) => option.name}
                  value={filters.company}
                  onChange={(e, value) => handleFilterChange('company', value)}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  renderInput={(params) => <TextField {...params} label="Select Company" />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={filteredObras}
                  getOptionLabel={(option) => option.name}
                  value={filters.obra}
                  onChange={(e, value) => handleFilterChange('obra', value)}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  renderInput={(params) => <TextField {...params} label="Select Obra" />}
                  fullWidth
                  disabled={!filters.company}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={filteredProjects}
                  getOptionLabel={(option) => option.name}
                  value={filters.project}
                  onChange={(e, value) => handleFilterChange('project', value)}
                  isOptionEqualToValue={(option, value) => option.project_id === value?.id}
                  renderInput={(params) => <TextField {...params} label="Select Project" />}
                  fullWidth
                  disabled={!filters.obra}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  options={filteredEmployees}
                  getOptionLabel={(option) => option.name}
                  value={filters.employee}
                  onChange={(e, value) => handleFilterChange('employee', value)}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  renderInput={(params) => <TextField {...params} label="Select Employee" />}
                  fullWidth
                  disabled={!filters.project}
                />
              </Grid>
              <Grid item xs={3}>
                <Button 
                  variant="contained"
                  onClick={handleViewClick}
                  disabled={!filters.employee} >
                  View
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography variant="h5" sx={{ mb: 2 }}> OR </Typography>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Search By Obra</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Autocomplete
                  options={searchByObraList}
                  getOptionLabel={(option) => option.name}
                  value={filters.searchObra}
                  onChange={(e, value) => handleFilterChange('searchObra', value)}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  renderInput={(params) => <TextField {...params} label="Select Obra" />}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={3}>
                <Button 
                  variant="contained"
                  onClick={handleObraViewClick}
                  disabled={!filters.searchObra} >
                  View
                </Button>
              </Grid>
          </CardContent>
        </Card>
       



        {showTable &&  filteredData.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Social Security</TableCell>
                  <TableCell>Employee Type</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Obra</TableCell>
                  <TableCell>Obra Address</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.emp_name}</TableCell>
                    <TableCell>{row.emp_social_security}</TableCell>
                    <TableCell>{row.emp_type}</TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.project_name}</TableCell>
                    <TableCell>{row.obra_name}</TableCell>
                    <TableCell>{row.obra_address}</TableCell>
                    <TableCell>{row.company_status}</TableCell>

                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleMarkAttendance(row.emp_id)}>
                        Mark Attendance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <AttendanceInput />
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AttendancePage;
