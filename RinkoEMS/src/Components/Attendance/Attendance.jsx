import React, { useState, useEffect } from 'react';
import {
  Box, Typography, MenuItem, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField, Button, Card, CardContent
} from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';
import axiosInstance from '../../services/axiosInstance';

const AttendancePage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get('/obraentradas');
      const groupedData = groupDataByName(response.data);
      setEmployeeData(groupedData);
      setFilteredData([]);
    };

    fetchData();
  }, []);

  const groupDataByName = (data) => {
    const grouped = {};

    data.forEach(item => {
      if (!grouped[item.emp_name]) {
        grouped[item.emp_name] = {
          ...item,
          projects: [],
          obras: [],
          obraAddresses: [],
          statuses: [],
          companyNames: [],
          workDates: [],
        };
      }

      grouped[item.emp_name].projects.push(item.project_name);
      grouped[item.emp_name].obras.push(item.obra_name);
      grouped[item.emp_name].obraAddresses.push(item.obra_address);
      grouped[item.emp_name].statuses.push(item.company_status);
      grouped[item.emp_name].companyNames.push(item.company_name);
      grouped[item.emp_name].workDates.push(item.work_date);
    });

    return Object.values(grouped);
  };

  const handleSearch = () => {
    const filtered = employeeData.filter(row =>
      row.emp_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <AdminLayout title="Attendance System">
      <Box sx={{ mt: 15, mb: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>Search Employee</Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                label="Search by Employee Name"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch}>
                Search
              </Button>
            </Box>
          </CardContent>
        </Card>

        {filteredData && filteredData.length > 0 && (
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
                  <TableCell>Work Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.emp_name}</TableCell>
                    <TableCell>{row.emp_social_security}</TableCell>
                    <TableCell>{row.emp_type}</TableCell>
                    <TableCell>
                      <Select value={row.companyNames.length > 0 ? row.companyNames[0] : ''} fullWidth>
                        {row.companyNames.map((company, i) => (
                          <MenuItem key={i} value={company}>{company}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={row.projects.length > 0 ? row.projects[0] : ''} fullWidth>
                        {row.projects.map((project, i) => (
                          <MenuItem key={i} value={project}>{project}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={row.obras.length > 0 ? row.obras[0] : ''} fullWidth>
                        {row.obras.map((obra, i) => (
                          <MenuItem key={i} value={obra}>{obra}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={row.obraAddresses.length > 0 ? row.obraAddresses[0] : ''} fullWidth>
                        {row.obraAddresses.map((address, i) => (
                          <MenuItem key={i} value={address}>{address}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={row.statuses.length > 0 ? row.statuses[0] : ''} fullWidth>
                        {row.statuses.map((status, i) => (
                          <MenuItem key={i} value={status}>{status}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={row.workDates.length > 0 ? row.workDates[0] : ''} fullWidth>
                        {row.workDates.map((date, i) => (
                          <MenuItem key={i} value={date}>{date}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AdminLayout>
  );
};

export default AttendancePage;
